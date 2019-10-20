import { abilitiesCollection } from "./origins";
import {
  abilitiesCollectionWithExtraData,
  abilitiesCollectionFilteredAndSorted
} from "./selectors";

describe("abilitiesCollectionWithExtraData selector", () => {
  describe("abilitiesCollection query", () => {
    it("should pass query to ofService abilitiesCollection custom query", () => {
      expect(abilitiesCollectionWithExtraData.test.queries[0]("foo")).toEqual(
        abilitiesCollection.customQueries.ofService("foo")
      );
    });
  });

  describe("results selector", () => {
    it("should add extra data about related modules to abilities collection", () => {
      expect(
        abilitiesCollectionWithExtraData.test.selector(
          [
            {
              _id: "foo-ability-1",
              _service: "foo-service-1",
              maximum: 13,
              exclusiveMaximum: true,
              minimum: 4,
              exclusiveMinimum: false
            },
            {
              _id: "foo-ability-2",
              _service: "foo-service-2",
              maximum: 16,
              exclusiveMaximum: false,
              minimum: 6,
              exclusiveMinimum: true
            },
            {
              _id: "foo-ability-3",
              _service: "foo-service-3"
            }
          ],
          [
            {
              _id: "foo-service-1",
              name: "foo-service-1-name"
            }
          ]
        )
      ).toEqual([
        {
          _id: "foo-ability-1",
          serviceName: "foo-service-1-name",
          _service: "foo-service-1",
          maximum: 13,
          exclusiveMaximum: true,
          maxValue: 12,
          minimum: 4,
          exclusiveMinimum: false,
          minValue: 4
        },
        {
          _id: "foo-ability-2",
          _service: "foo-service-2",
          maximum: 16,
          exclusiveMaximum: false,
          maxValue: 16,
          minimum: 6,
          exclusiveMinimum: true,
          minValue: 7
        },
        {
          _id: "foo-ability-3",
          _service: "foo-service-3",
          maxValue: null,
          minValue: null
        }
      ]);
    });
  });

  describe("custom queries", () => {
    describe("ofService", () => {
      it("should return serviceId", () => {
        expect(
          abilitiesCollectionWithExtraData.test.customQueries.ofService("foo-service")
        ).toEqual("foo-service");
      });

      it("should return undefined if no serviceId is provided", () => {
        expect(abilitiesCollectionWithExtraData.test.customQueries.ofService()).toEqual(undefined);
      });
    });
  });
});

describe("abilitiesCollectionFilteredAndSorted selector", () => {
  describe("abilitiesCollectionFiltered query", () => {
    it("should pass query.search property", () => {
      expect(
        abilitiesCollectionFilteredAndSorted.test.queries[0]({
          search: "foo"
        })
      ).toEqual("foo");
    });

    it("should pass undefined if no query is property", () => {
      expect(abilitiesCollectionFilteredAndSorted.test.queries[0]()).toEqual(undefined);
    });
  });

  describe("results selector", () => {
    it("should return results ordered by query sortBy property", () => {
      expect(
        abilitiesCollectionFilteredAndSorted.test.selector(
          [
            {
              foo: "b"
            },
            {
              foo: "a"
            }
          ],
          {
            sortBy: "foo"
          }
        )
      ).toEqual([
        {
          foo: "a"
        },
        {
          foo: "b"
        }
      ]);
    });

    it("should return results ordered by name if no query is provided", () => {
      expect(
        abilitiesCollectionFilteredAndSorted.test.selector([
          {
            name: "b",
            foo: "a"
          },
          {
            name: "a",
            foo: "b"
          }
        ])
      ).toEqual([
        {
          name: "a",
          foo: "b"
        },
        {
          name: "b",
          foo: "a"
        }
      ]);
    });

    it("should return results in reverse order if reverse query is provided", () => {
      expect(
        abilitiesCollectionFilteredAndSorted.test.selector(
          [
            {
              name: "a",
              foo: "b"
            },
            {
              name: "b",
              foo: "a"
            }
          ],
          {
            reverse: true
          }
        )
      ).toEqual([
        {
          name: "b",
          foo: "a"
        },
        {
          name: "a",
          foo: "b"
        }
      ]);
    });
  });
});
