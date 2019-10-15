import { controllerModels } from "./origins";
import { currentController } from "./selectors";

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
