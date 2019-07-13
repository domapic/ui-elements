import sinon from "sinon";
import { cookies } from "./origins";
import { acceptCookies, rejectCookies, toggleCookies } from "./actions";

describe("cookies actions", () => {
  let sandbox;
  let update;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    update = sinon.spy();
    sandbox.stub(cookies, "accepted").returns({
      update
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("acceptCookies", () => {
    it("should update accepted cookies with true", () => {
      acceptCookies();
      expect(update.getCall(0).args[0]).toEqual(true);
    });
  });

  describe("rejectCookies", () => {
    it("should update accepted cookies with false", () => {
      rejectCookies();
      expect(update.getCall(0).args[0]).toEqual(false);
    });
  });

  describe("toggleCookies", () => {
    it("should update accepted cookies with provided value", () => {
      toggleCookies("foo");
      expect(update.getCall(0).args[0]).toEqual("foo");
    });
  });
});
