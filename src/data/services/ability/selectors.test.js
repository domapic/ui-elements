import { abilityModels, abilityStates } from "./origins";
import { abilityModelsWithExtraData, abilityStatesLoaded } from "./selectors";

describe("abilityModelsWithExtraData selector", () => {
  describe("abilityModels query", () => {
    it("should pass query to byId abilityModels custom query", () => {
      expect(abilityModelsWithExtraData.test.queries[0]("foo")).toEqual(
        abilityModels.customQueries.byId("foo")
      );
    });
  });

  describe("results selector", () => {
    it("should add extra data about related modules to abilities collection", () => {
      expect(
        abilityModelsWithExtraData.test.selector(
          {
            _id: "foo-ability-1",
            _service: "foo-service-1",
            maximum: 13,
            exclusiveMaximum: true,
            minimum: 4,
            exclusiveMinimum: false
          },
          [
            {
              _id: "foo-service-1",
              name: "foo-service-1-name"
            }
          ]
        )
      ).toEqual({
        _id: "foo-ability-1",
        serviceName: "foo-service-1-name",
        _service: "foo-service-1",
        maximum: 13,
        exclusiveMaximum: true,
        maxValue: 12,
        minimum: 4,
        exclusiveMinimum: false,
        minValue: 4
      });
    });
  });

  describe("custom queries", () => {
    describe("byId", () => {
      it("should return provided id", () => {
        expect(abilityModelsWithExtraData.test.customQueries.byId("foo-id")).toEqual("foo-id");
      });
    });
  });
});

describe("abilityStatesLoaded selector", () => {
  describe("abilityStates query", () => {
    it("should pass query to byId abilityStates custom query", () => {
      expect(abilityStatesLoaded.test.queries[0]("foo")).toEqual(
        abilityStates.customQueries.byId("foo")
      );
    });
  });

  describe("results selector", () => {
    it("should add extra data about related modules to abilities collection", () => {
      expect(abilityStatesLoaded.test.selector()).toEqual(true);
    });
  });

  describe("custom queries", () => {
    describe("byId", () => {
      it("should return provided id", () => {
        expect(abilityStatesLoaded.test.customQueries.byId("foo-id")).toEqual("foo-id");
      });
    });
  });
});
