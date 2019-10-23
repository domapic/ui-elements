import { servicesCollection } from "./origins";
import {
  modulesCollection,
  pluginsCollection,
  modulesCollectionFiltered,
  modulesCollectionFilteredAndSorted,
  pluginsCollectionFilteredAndSorted
} from "./selectors";

describe("modulesCollection selector", () => {
  describe("servicesCollection query", () => {
    it('should return "modules" type', () => {
      expect(modulesCollection.test.queries[0]()).toEqual(
        servicesCollection.customQueries.type("module")
      );
    });
  });

  describe("results selector", () => {
    it("should return results", () => {
      expect(modulesCollection.test.selector("foo")).toEqual("foo");
    });
  });
});

describe("pluginsCollection selector", () => {
  describe("servicesCollection query", () => {
    it('should return "modules" type', () => {
      expect(pluginsCollection.test.queries[0]()).toEqual(
        servicesCollection.customQueries.type("plugin")
      );
    });
  });

  describe("results selector", () => {
    it("should return results", () => {
      expect(pluginsCollection.test.selector("foo")).toEqual("foo");
    });
  });
});

describe("modulesCollectionFiltered selector", () => {
  describe("results selector", () => {
    it("should return all results if no search is provided", () => {
      expect(
        modulesCollectionFiltered.test.selector([
          {
            name: "foo",
            description: "foo"
          }
        ])
      ).toEqual([
        {
          name: "foo",
          description: "foo"
        }
      ]);
    });

    it("should return results which name contains provided search", () => {
      expect(
        modulesCollectionFiltered.test.selector(
          [
            {
              name: "foo",
              description: "foo"
            },
            {
              name: "testing-name-search",
              description: "foo"
            }
          ],
          "name"
        )
      ).toEqual([
        {
          name: "testing-name-search",
          description: "foo"
        }
      ]);
    });

    it("should return results which description contains provided search", () => {
      expect(
        modulesCollectionFiltered.test.selector(
          [
            {
              name: "foo",
              description: "foo"
            },
            {
              name: "foo",
              description: "testing-description-search"
            }
          ],
          "descrip"
        )
      ).toEqual([
        {
          name: "foo",
          description: "testing-description-search"
        }
      ]);
    });
  });
});

describe("modulesCollectionFilteredAndSorted selector", () => {
  describe("modulesCollection query", () => {
    it("should return query.search property", () => {
      expect(
        modulesCollectionFilteredAndSorted.test.queries[0]({
          search: "foo"
        })
      ).toEqual("foo");
    });

    it("should return undefined if no query is provided", () => {
      expect(modulesCollectionFilteredAndSorted.test.queries[0]()).toEqual(undefined);
    });
  });
});

describe("pluginsCollectionFilteredAndSorted selector", () => {
  describe("pluginsCollection query", () => {
    it("should return query.search property", () => {
      expect(
        pluginsCollectionFilteredAndSorted.test.queries[0]({
          search: "foo"
        })
      ).toEqual("foo");
    });

    it("should return undefined if no query is provided", () => {
      expect(pluginsCollectionFilteredAndSorted.test.queries[0]()).toEqual(undefined);
    });
  });
});
