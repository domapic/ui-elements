import { byPageAndAbility } from "./filters";

describe("byPageAndAbility filter", () => {
  describe("logs query", () => {
    it("should return null if called with undefined", () => {
      expect(byPageAndAbility()).toEqual(null);
    });

    it("should return an empty object if does not receive page nor ability", () => {
      expect(
        byPageAndAbility({
          foo: "foo"
        })
      ).toEqual({
        queryString: {}
      });
    });

    it("should return queryString adding page", () => {
      expect(
        byPageAndAbility({
          page: 2
        })
      ).toEqual({
        queryString: {
          page: 2
        }
      });
    });

    it("should return queryString adding ability", () => {
      expect(
        byPageAndAbility({
          ability: "foo-ability"
        })
      ).toEqual({
        queryString: {
          ability: "foo-ability"
        }
      });
    });

    it("should return queryString adding ability and page", () => {
      expect(
        byPageAndAbility({
          ability: "foo-ability",
          page: 4
        })
      ).toEqual({
        queryString: {
          ability: "foo-ability",
          page: 4
        }
      });
    });
  });
});
