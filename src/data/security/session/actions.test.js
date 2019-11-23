import sinon from "sinon";

import { apis } from "@data-provider/axios";
import { socket } from "data/socket";

import { authJwt, authSessionStatus } from "../authentication/origins";

import { session } from "./actions";

const waitForEventResolved = (time = 500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

describe("authentication session", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(apis, "config");
    sandbox.stub(apis, "clean");
    sandbox.stub(apis, "setHeaders");
    sandbox.stub(session._refreshToken, "read").resolves("foo-refresh-token");
    sandbox.stub(authJwt, "create").resolves({
      accessToken: "foo-access-token"
    });
  });

  afterEach(() => {
    sandbox.restore();
    apis.reset();
  });

  describe("setup method", () => {
    it("should call to configure apis needing auth with authentication error handler", async () => {
      expect.assertions(2);
      session.setup();
      expect(apis.config.getCall(0).args[0]).toEqual({
        authErrorHandler: session._doLogin
      });

      expect(apis.config.getCall(0).args[1]).toEqual(["need_auth"]);
    });

    it("should refresh access token data when socket controller:created event is received and there is a refreshToken", async () => {
      expect.assertions(2);
      socket._trigger("controller:created", {
        _id: "foo"
      });
      await waitForEventResolved();
      expect(authJwt.create.getCall(0).args[0]).toEqual({
        refreshToken: "foo-refresh-token"
      });
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({
        Authorization: "Bearer foo-access-token"
      });
    });

    it("should call only once to create new access token even when multiple events are received", async () => {
      expect.assertions(2);
      const FOO_ID = {
        _id: "foo"
      };
      socket._trigger("controller:created", FOO_ID);
      socket._trigger("controller:deleted", FOO_ID);
      socket._trigger("controller:updated", FOO_ID);
      socket._trigger("controllerToken:created", FOO_ID);
      socket._trigger("controllerToken:deleted", FOO_ID);
      socket._trigger("controllerToken:updated", FOO_ID);
      socket._trigger("cloudUser:updated", FOO_ID);
      socket._trigger("cloudUser:deleted", FOO_ID);
      await waitForEventResolved();
      expect(authJwt.create.callCount).toEqual(1);
      expect(session._refreshToken.read.callCount).toEqual(8);
    });

    it("should not refresh access token data when socket controller:created event is received and there is no a refreshToken", async () => {
      expect.assertions(1);
      session._refreshToken.read.resolves(null);
      socket._trigger("controller:created", {
        _id: "foo"
      });
      await waitForEventResolved();
      expect(apis.setHeaders.callCount).toEqual(0);
    });
  });

  describe("logout method", () => {
    let historyPush;
    let historyMock;
    beforeEach(() => {
      sandbox.stub(session._refreshToken, "delete").resolves();
      sandbox.stub(session._apiKey, "delete").resolves();
      sandbox.stub(session._remember, "delete").resolves();
      sandbox.stub(authSessionStatus.isLogedIn(), "update").resolves();
      historyPush = sandbox.stub();
      historyMock = {
        push: historyPush,
        location: {
          pathname: "foo-path"
        }
      };
      session.setup(historyMock, "foo-path");
    });

    it("should call to delete refreshToken, apiKey, rememberMe, and update idLogedIn as false", async () => {
      expect.assertions(4);
      await session.logout();
      expect(session._refreshToken.delete.callCount).toEqual(1);
      expect(session._apiKey.delete.callCount).toEqual(1);
      expect(session._remember.delete.callCount).toEqual(1);
      expect(authSessionStatus.isLogedIn().update.getCall(0).args[0]).toEqual(false);
    });

    it("should redirect to login url", async () => {
      expect.assertions(1);
      await session.logout();
      expect(historyPush.getCall(0).args[0]).toEqual("foo-path");
    });

    it("should add current url to login url as redirect parameter if current url is different to login url", async () => {
      expect.assertions(1);
      historyMock.location.pathname = "foo-different-path";
      await session.logout();
      expect(historyPush.getCall(0).args[0]).toEqual("foo-path?redirect=foo-different-path");
    });

    it("should remove authentication headers", async () => {
      expect.assertions(1);
      await session.logout();
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({});
    });

    it("should clean all apis", async () => {
      expect.assertions(1);
      await session.logout();
      expect(apis.clean.callCount).toEqual(1);
    });
  });

  describe("login method", () => {
    let fooRetry;

    beforeEach(() => {
      fooRetry = sandbox.stub().resolves();
      sandbox.stub(session._apiKey, "read").resolves("foo-api-key");
      sandbox.stub(authSessionStatus.isLogedIn(), "update").resolves();
    });

    it("should call to get accessToken, set it to api headers, and run retry when there is refreshToken", async () => {
      expect.assertions(3);
      await session._doLogin([], fooRetry);
      expect(authJwt.create.getCall(0).args[0]).toEqual({
        refreshToken: "foo-refresh-token"
      });
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({
        Authorization: "Bearer foo-access-token"
      });
      expect(fooRetry.callCount).toEqual(1);
    });

    it("should call only once to create access token", async () => {
      expect.assertions(2);
      session._doLogin([], fooRetry);
      session._doLogin([], fooRetry);
      session._doLogin([], fooRetry);
      await session._doLogin([], fooRetry);

      expect(authJwt.create.callCount).toEqual(1);
      expect(fooRetry.callCount).toEqual(4);
    });

    it("should set apiKey and run retry when there is no refreshToken and there is apiKey", async () => {
      expect.assertions(2);
      session._refreshToken.read.resolves(null);
      await session._doLogin([], fooRetry);
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({
        "X-Api-Key": "foo-api-key"
      });
      expect(fooRetry.callCount).toEqual(1);
    });

    it("should logout and throw an error when there is no apiKey nor refreshToken", async () => {
      expect.assertions(2);
      session._refreshToken.read.resolves(null);
      session._apiKey.read.resolves(null);
      try {
        await session._doLogin([], fooRetry);
      } catch (err) {
        expect(apis.setHeaders.getCall(0).args[0]).toEqual({});
        expect(err.message).toEqual("Invalid credentials");
      }
    });

    it("should logout and throw an error when retry returns an unauthorized error", async () => {
      expect.assertions(2);
      fooRetry.rejects(new Error("Unauthorized"));
      try {
        await session._doLogin([], fooRetry);
      } catch (err) {
        expect(apis.setHeaders.getCall(1).args[0]).toEqual({});
        expect(err.message).toEqual("Unauthorized");
      }
    });

    it("should throw an error when retry returns an error different to unauthorized", async () => {
      expect.assertions(2);
      fooRetry.rejects(new Error("Foo error"));
      try {
        await session._doLogin([], fooRetry);
      } catch (err) {
        expect(apis.setHeaders.callCount).toEqual(1);
        expect(err.message).toEqual("Foo error");
      }
    });
  });
});
