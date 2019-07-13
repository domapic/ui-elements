import { formatDate, displayValue } from "./formatters";

describe("formatters", () => {
  describe("formatDate", () => {
    it("should return formatted date", () => {
      expect(formatDate("1979-05-15")).toEqual("79-05-15, 00:00:00");
    });
  });

  describe("displayValue", () => {
    it("should return same string when receives string", () => {
      expect(displayValue("foo")).toEqual("foo");
    });

    it("should return same value when receives a number", () => {
      expect(displayValue(5)).toEqual(5);
    });

    it("should return stringified value when receives an object", () => {
      expect(displayValue({ foo: "foo" })).toEqual('{"foo":"foo"}');
    });

    it("should return stringified value when receives an array", () => {
      expect(displayValue(["foo", 5])).toEqual('["foo",5]');
    });
  });
});
