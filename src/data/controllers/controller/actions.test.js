import sinon from "sinon";

import { socket } from "data/socket";

import { selectedController } from "./origins";
import { setSelectedController } from "./actions";

describe("setSelectedController action", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.spy(selectedController.id(), "update");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should call to update selectedController id property", () => {
    setSelectedController("foo-controller-id");
    expect(selectedController.id().update.getCall(0).args[0]).toEqual("foo-controller-id");
  });

  it("should set socket currentController with provided id", () => {
    setSelectedController("foo-id");
    expect(socket.currentController).toEqual("foo-id");
  });
});
