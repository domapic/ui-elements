import { displayValue, formatDate } from "helpers/formatters";
import { byPageAndAbility } from "./filters";
import { logsPage, logsPageLoaded, logsPageWithDetails } from "./selectors";

describe("logsPage selector", () => {
  describe("logs query", () => {
    it('should return "byPageAndAbility" query', () => {
      expect(
        logsPage.test.queries[0]({
          page: 2
        })
      ).toEqual(
        byPageAndAbility({
          page: 2
        })
      );
    });
  });

  describe("results selector", () => {
    it("should return results", () => {
      expect(logsPage.test.selector("foo")).toEqual("foo");
    });
  });
});

describe("logsPageLoaded selector", () => {
  describe("logs query", () => {
    it('should return "byPageAndAbility" query', () => {
      expect(
        logsPageLoaded.test.queries[0]({
          ability: 2
        })
      ).toEqual(
        byPageAndAbility({
          ability: 2
        })
      );
    });
  });

  describe("results selector", () => {
    it("should return true", () => {
      expect(logsPageLoaded.test.selector()).toEqual(true);
    });
  });
});

describe("logsPageWithDetails selector", () => {
  describe("logsPage query", () => {
    it("should bypass query", () => {
      expect(logsPageWithDetails.test.queries[0]("foo")).toEqual("foo");
    });
  });

  describe("results selector", () => {
    it("should return log data adding correspondant ability and service data", () => {
      const timestamp = new Date().getTime();
      expect(
        logsPageWithDetails.test.selector(
          [
            {
              _id: "foo-ability-1",
              name: "foo-ability-name",
              _service: "foo-service-1"
            }
          ],
          [
            {
              _id: "foo-service-1",
              name: "foo-service-name"
            }
          ],
          [
            {
              createdAt: timestamp,
              foo: "foo",
              _ability: "foo-ability-1",
              data: 3
            },
            {
              createdAt: timestamp,
              foo: "foo",
              _ability: "foo-ability-2",
              data: "foo-data"
            }
          ]
        )
      ).toEqual([
        {
          createdAt: timestamp,
          foo: "foo",
          _ability: "foo-ability-1",
          data: displayValue(3),
          dateTime: formatDate(timestamp),
          ability: "foo-ability-name",
          module: "foo-service-name"
        },
        {
          createdAt: timestamp,
          foo: "foo",
          _ability: "foo-ability-2",
          data: displayValue("foo-data"),
          dateTime: formatDate(timestamp),
          ability: "-",
          module: "-"
        }
      ]);
    });
  });
});
