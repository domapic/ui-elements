import sinon from "sinon";
import AxiosMock from "../../../../config/tests/Axios.mock.js";

import { socket } from "data/socket";
import { controllerModels } from "./origins";
import { currentController, SelectedControllerBasedOrigin } from "./selectors";

describe("currentController selector", () => {
  describe("controllerModels query", () => {
    it("should throw an error if selectedController does not return an id", () => {
      expect(() => currentController.test.queries[0](null, [{}])).toThrow();
    });

    it("should pass selectedController id to controllerModels.byId custom query", () => {
      expect(currentController.test.queries[0](null, [{ id: "foo-id" }])).toEqual(
        controllerModels.customQueries.byId("foo-id")
      );
    });
  });

  describe("results selector", () => {
    it("should return currentController result", () => {
      expect(currentController.test.selector(null, "foo")).toEqual("foo");
    });
  });
});

describe("SelectedControllerBasedOrigin constructor", () => {
  let axios;
  let sandbox;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    axios = new AxiosMock();
  });

  afterAll(() => {
    sandbox.restore();
    axios.restore();
  });

  beforeEach(() => {
    axios.stubs.instance.resolves({
      data: "foo"
    });
    axios.stubs.instance.resetHistory();
  });

  describe("returned selector", () => {
    describe("when there is no selected controller", () => {
      it("should return the value of api origin created with provided url", async () => {
        const fooApi = SelectedControllerBasedOrigin("/foo-url", {});
        await fooApi.read();
        expect(axios.stubs.instance.getCall(0).args[0].url).toEqual("/foo-url");
      });
    });
  });

  describe("provided callback", () => {
    it("should be executed passing both generated api origins (controller-based and simple)", async () => {
      expect.assertions(2);
      const fooCallback = sandbox.stub();
      SelectedControllerBasedOrigin("/foo-url", {}, fooCallback);
      const callbackArguments = fooCallback.getCall(0).args;
      expect(callbackArguments[0]._url).toEqual("/foo-url");
      expect(callbackArguments[1]._url).toEqual("/controllers/:controllerId/foo-url");
    });
  });

  describe("socket listeners", () => {
    let fooCallback;
    let controllerBasedOrigin;

    beforeEach(() => {
      fooCallback = sandbox.stub();
      SelectedControllerBasedOrigin("/foo-url", {}, fooCallback);
      controllerBasedOrigin = fooCallback.getCall(0).args[1];

      sandbox.spy(controllerBasedOrigin, "clean");
    });

    it("should clean generated controller-based origin when socket controllerToken:updated event is received", () => {
      socket._trigger("controllerToken:updated");
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });

    it("should clean generated controller-based origin when socket controllerToken:deleted event is received", () => {
      socket._trigger("controllerToken:deleted");
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });

    it("should clean generated controller-based origin when socket controllerToken:created event is received", () => {
      socket._trigger("controllerToken:created");
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });
  });
});
