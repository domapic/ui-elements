import sinon from "sinon";

import { apis } from "@xbyorange/mercury-api";

import {
  authSessionDetails,
  authSessionRemember,
  authSessionTemporal,
  authSessionStatus,
  authJwt,
  authGoogle
} from "./origins";
import { authSession } from "./selectors";

import {
  cleanAllAuthSessions,
  doJwtLogin,
  doGoogleOauthLogin,
  doApiKeyLogin,
  updateRemember,
  updateIsLoginIn
} from "./actions";

describe("security authentication actions", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(authSessionRemember, "delete").resolves();
    sandbox.stub(authSessionTemporal, "delete").resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("cleanAllAuthSessions", () => {
    it("should call to delete authSessionRemember", async () => {
      expect.assertions(1);
      await cleanAllAuthSessions();
      expect(authSessionRemember.delete.callCount).toEqual(1);
    });

    it("should call to delete authSessionTemporal", async () => {
      expect.assertions(1);
      await cleanAllAuthSessions();
      expect(authSessionTemporal.delete.callCount).toEqual(1);
    });
  });

  describe("doJwtLogin", () => {
    beforeEach(() => {
      sandbox.stub(authJwt, "create").resolves({
        refreshToken: "foo-refresh-token",
        accessToken: "foo-access-token"
      });
      sandbox.stub(apis, "setHeaders").resolves();
      sandbox.stub(authSession.refreshToken(), "update").resolves();
      sandbox.stub(authSessionStatus.isLogedIn(), "update").resolves();
    });

    it("should call to delete authSessionRemember", async () => {
      expect.assertions(1);
      await doJwtLogin();
      expect(authSessionRemember.delete.callCount).toEqual(1);
    });

    it("should call to delete authSessionTemporal", async () => {
      expect.assertions(1);
      await doJwtLogin();
      expect(authSessionTemporal.delete.callCount).toEqual(1);
    });

    it("should call to create authJwt with provided user data", async () => {
      expect.assertions(1);
      await doJwtLogin({
        foo: "foo"
      });
      expect(authJwt.create.getCall(0).args[0]).toEqual({
        foo: "foo"
      });
    });

    it("should pass returned refreshToken to authSession.refreshToken", async () => {
      expect.assertions(1);
      await doJwtLogin({
        foo: "foo"
      });
      expect(authSession.refreshToken().update.getCall(0).args[0]).toEqual("foo-refresh-token");
    });

    it("should set api headers with returned accesToken", async () => {
      expect.assertions(1);
      await doJwtLogin({
        foo: "foo"
      });
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({
        Authorization: "Bearer foo-access-token"
      });
    });

    it("should set authSessionStatus.isLogedIn as true", async () => {
      expect.assertions(1);
      await doJwtLogin({
        foo: "foo"
      });
      expect(authSessionStatus.isLogedIn().update.getCall(0).args[0]).toEqual(true);
    });
  });

  describe("doApiKeyLogin", () => {
    beforeEach(() => {
      sandbox.stub(apis, "setHeaders").resolves();
      sandbox.stub(authSession.apiKey(), "update").resolves();
    });

    it("should call to delete authSessionRemember", async () => {
      expect.assertions(1);
      await doApiKeyLogin();
      expect(authSessionRemember.delete.callCount).toEqual(1);
    });

    it("should call to delete authSessionTemporal", async () => {
      expect.assertions(1);
      await doApiKeyLogin();
      expect(authSessionTemporal.delete.callCount).toEqual(1);
    });

    it("should update authSession.apiKey with provided api key", async () => {
      expect.assertions(1);
      await doApiKeyLogin("foo-api-key");
      expect(authSession.apiKey().update.getCall(0).args[0]).toEqual("foo-api-key");
    });

    it("should set api headers with returned accessToken", async () => {
      expect.assertions(1);
      await doApiKeyLogin("foo-api-key");
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({
        "X-Api-Key": "foo-api-key"
      });
    });
  });

  describe("doGoogleOauthLogin", () => {
    beforeEach(() => {
      sandbox.stub(authGoogle, "create").resolves({
        refreshToken: "foo-refresh-token",
        accessToken: "foo-access-token"
      });
      sandbox.stub(apis, "setHeaders").resolves();
      sandbox.stub(authSession.refreshToken(), "update").resolves();
      sandbox.stub(authSessionStatus.isLogedIn(), "update").resolves();
    });

    it("should call to delete authSessionRemember", async () => {
      expect.assertions(1);
      await doGoogleOauthLogin();
      expect(authSessionRemember.delete.callCount).toEqual(1);
    });

    it("should call to delete authSessionTemporal", async () => {
      expect.assertions(1);
      await doGoogleOauthLogin();
      expect(authSessionTemporal.delete.callCount).toEqual(1);
    });

    it("should call to create authGoogle with provided user data", async () => {
      expect.assertions(1);
      await doGoogleOauthLogin({
        foo: "foo"
      });
      expect(authGoogle.create.getCall(0).args[0]).toEqual({
        foo: "foo"
      });
    });

    it("should pass returned refreshToken to authSession.refreshToken", async () => {
      expect.assertions(1);
      await doGoogleOauthLogin({
        foo: "foo"
      });
      expect(authSession.refreshToken().update.getCall(0).args[0]).toEqual("foo-refresh-token");
    });

    it("should set api headers with returned accesToken", async () => {
      expect.assertions(1);
      await doGoogleOauthLogin({
        foo: "foo"
      });
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({
        Authorization: "Bearer foo-access-token"
      });
    });

    it("should set authSessionStatus.isLogedIn as true", async () => {
      expect.assertions(1);
      await doGoogleOauthLogin({
        foo: "foo"
      });
      expect(authSessionStatus.isLogedIn().update.getCall(0).args[0]).toEqual(true);
    });
  });

  describe("updateRemember", () => {
    beforeEach(() => {
      sandbox.stub(authSessionDetails.rememberMe(), "update").resolves();
    });

    it("should call to update authSessionDetails.rememberMe", async () => {
      expect.assertions(1);
      await updateRemember(true);
      expect(authSessionDetails.rememberMe().update.getCall(0).args[0]).toEqual(true);
    });
  });

  describe("updateIsLoginIn", () => {
    beforeEach(() => {
      sandbox.stub(authSessionStatus.isLoginIn(), "update").resolves();
    });

    it("should call to update authSessionDetails.rememberMe", async () => {
      expect.assertions(1);
      await updateIsLoginIn(false);
      expect(authSessionStatus.isLoginIn().update.getCall(0).args[0]).toEqual(false);
    });
  });
});
