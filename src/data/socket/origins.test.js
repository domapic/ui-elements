import * as sinon from "sinon";
import { SocketMock } from "../../../config/tests/Socket.mock.js";
import { socket } from "./origins";

const waitForEvents = (time = 2000) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });

describe("socket", () => {
  let sandbox;
  let fooScript;
  let socketMock;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    fooScript = {};
    sandbox.stub(document, "createElement").returns(fooScript);
    sandbox.stub(document.head, "appendChild");
    sandbox.spy(global.console, "log");
    socketMock = new SocketMock();
    sandbox.spy(socketMock, "connect");
    sandbox.spy(socketMock, "close");
    window.io = sandbox.stub().returns(false);
  });

  afterAll(() => {
    sandbox.restore();
  });

  afterEach(async () => {
    sandbox.reset();
    await waitForEvents(3000);
  });

  describe("setup method", () => {
    it("should append socket.io script to head", () => {
      expect.assertions(2);
      socket.setup("foo.com", "1.4");
      expect(fooScript.src).toEqual("foo.com/socket.io/socket.io.js?v=1.4");
      expect(document.head.appendChild.getCall(0).args[0]).toEqual(fooScript);
    });

    it("should log if socket global is not found in window", async () => {
      expect.assertions(1);
      //jest.setTimeout(10000);
      fooScript.onload();
      await waitForEvents();
      expect(console.log.getCall(1).args[0]).toEqual("Sockets are not available");
    });

    it("should not create socket instance and connect if avoidAnonymous option is set", async () => {
      expect.assertions(2);
      socket._currentToken = null; //force reexecution of doLogin
      socket._options.avoidAnonymous = true;
      window.io.returns(socketMock);
      fooScript.onload();
      await waitForEvents();
      expect(window.io.callCount).toEqual(0);
      expect(socketMock.connect.callCount).toEqual(0);
    });

    it("should create socket instance and connect if socket.io global is found", async () => {
      expect.assertions(2);
      socket._currentToken = null; //force reexecution of doLogin
      socket._options.avoidAnonymous = false;
      window.io.returns(socketMock);
      fooScript.onload();
      await waitForEvents();
      expect(window.io.callCount).toEqual(1);
      expect(socketMock.connect.callCount).toEqual(1);
    });
  });

  describe("socket auth", () => {
    beforeEach(() => {
      window.io.returns(socketMock);
    });

    it("should close socket and connect again when refreshToken changes", async () => {
      expect.assertions(2);
      socket._refreshToken.update("foo-refresh-token");
      await waitForEvents();
      expect(socketMock.close.callCount).toEqual(1);
      expect(socketMock.connect.callCount).toEqual(1);
    });

    it("should not close socket and connect again when refreshToken does not change", async () => {
      expect.assertions(2);
      socket._refreshToken.update("foo-refresh-token");
      await waitForEvents();
      expect(socketMock.close.callCount).toEqual(0);
      expect(socketMock.connect.callCount).toEqual(0);
    });

    it("should close socket and connect again when apiKey changes", async () => {
      expect.assertions(2);
      socket._refreshToken.update(null);
      socket._apiKey.update("foo-api-key");
      await waitForEvents();
      expect(socketMock.close.callCount).toEqual(1);
      expect(socketMock.connect.callCount).toEqual(1);
    });
  });

  describe("socket events", () => {
    it("should not emit authentication if there is no auth token", () => {
      expect.assertions(1);
      socket._currentToken = null;
      socketMock.emit("connect");
      expect(console.log.callCount).toEqual(1);
    });

    it("should emit authentication with current apikey on connect event", async () => {
      expect.assertions(1);
      socket._apiKey.update("foo-api-token");
      await waitForEvents();
      socketMock.once("authentication", eventData => {
        expect(eventData).toEqual({
          apiKey: "foo-api-token"
        });
      });
      socketMock.emit("connect");
    });

    it("should emit authentication with current refreshToken on connect event", async () => {
      expect.assertions(1);
      socket._refreshToken.update("foo-refresh-token");
      await waitForEvents();
      socketMock.once("authentication", eventData => {
        expect(eventData).toEqual({
          jwt: "foo-refresh-token"
        });
      });
      socketMock.emit("connect");
    });

    it("should log error on error event", async () => {
      expect.assertions(1);
      await waitForEvents();
      socketMock.once("error", () => {
        expect(console.log.getCall(1).args[0]).toEqual("foo-error");
      });
      socketMock.emit("error", "foo-error");
    });

    it("should log disconnect event", async () => {
      expect.assertions(1);
      await waitForEvents();
      socketMock.once("disconnect", () => {
        expect(console.log.getCall(0).args[0]).toEqual("Socket disconnected");
      });
      socketMock.emit("disconnect");
    });

    it("should remove token and close connection on unauthorized", async () => {
      expect.assertions(2);
      socketMock.once("unauthorized", async () => {
        expect(console.log.getCall(0).args[0]).toEqual("Error in socket authentication:");
        await waitForEvents(1000);
        expect(socketMock.close.callCount).toEqual(1);
      });
      socketMock.emit("unauthorized", new Error());
    });

    it("should emit current controller if defined on authenticated event", async () => {
      expect.assertions(3);
      socketMock.connect();
      socketMock.once("changeController", currentController => {
        expect(console.log.getCall(2).args[0]).toEqual("Socket authenticated");
        expect(currentController).toEqual("foo-controller-id");
        expect(socket.currentController).toEqual(currentController);
      });
      socket._currentController = "foo-controller-id";
      socketMock.emit("authenticated");
    });
  });
});
