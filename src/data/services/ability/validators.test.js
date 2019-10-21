import { validateAbilityData } from "./validators";

describe("ability validators", () => {
  describe("validateAbilityData method", () => {
    describe("when ability type is number", () => {
      it("should not return error if value is a valid number", () => {
        expect(
          validateAbilityData(
            {
              type: "number"
            },
            5
          )
        ).toEqual(null);
      });

      it("should return error if value is not a valid number", () => {
        expect(
          validateAbilityData(
            {
              type: "number"
            },
            "foo"
          )
        ).toEqual("Not a valid number");
      });

      it("should return error if value is higher than maxValue", () => {
        expect(
          validateAbilityData(
            {
              type: "number",
              maxValue: 15
            },
            18
          )
        ).toEqual("Maximum allowed value is 15");
      });

      it("should not return error if value is not higher than maxValue", () => {
        expect(
          validateAbilityData(
            {
              type: "number",
              maxValue: 15
            },
            12
          )
        ).toEqual(null);
      });

      it("should return error if value is lower than minValue", () => {
        expect(
          validateAbilityData(
            {
              type: "number",
              minValue: 10
            },
            8
          )
        ).toEqual("Minimum allowed value is 10");
      });

      it("should not return error if value is not lower than minValue", () => {
        expect(
          validateAbilityData(
            {
              type: "number",
              minValue: 10
            },
            12
          )
        ).toEqual(null);
      });

      it("should return error if value is not multiple of multipleOf", () => {
        expect(
          validateAbilityData(
            {
              type: "number",
              multipleOf: 10
            },
            18
          )
        ).toEqual("Has to be multiple of 10");
      });

      it("should not return error if value is multiple of multipleOf", () => {
        expect(
          validateAbilityData(
            {
              type: "number",
              multipleOf: 10
            },
            20
          )
        ).toEqual(null);
      });

      it("should return all errors concated", () => {
        expect(
          validateAbilityData(
            {
              type: "number",
              maxValue: 20,
              multipleOf: 10
            },
            38
          )
        ).toEqual("Maximum allowed value is 20. Has to be multiple of 10");
      });
    });

    describe("when ability type is string", () => {
      it("should return error if ability format is date-time and value does not match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "date-time"
            },
            "foo"
          )
        ).toEqual("Not valid ISO8601 date-time");
      });

      it("should return error if ability format is email and value does not match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "email"
            },
            "foo"
          )
        ).toEqual("Not valid email");
      });

      it("should not return error if ability format is email and value does match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "email"
            },
            "foo@foo.com"
          )
        ).toEqual(null);
      });

      it("should return error if ability format is hostname and value does not match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "hostname"
            },
            "foo"
          )
        ).toEqual("Not valid hostname");
      });

      it("should not return error if ability format is hostname and value does match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "hostname"
            },
            "foo.com"
          )
        ).toEqual(null);
      });

      it("should return error if ability format is ipv4 and value does not match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "ipv4"
            },
            "foo"
          )
        ).toEqual("Not valid ipv4");
      });

      it("should not return error if ability format is ipv4 and value does match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "ipv4"
            },
            "192.168.1.1"
          )
        ).toEqual(null);
      });

      it("should return error if ability format is ipv6 and value does not match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "ipv6"
            },
            "foo"
          )
        ).toEqual("Not valid ipv6");
      });

      it("should not return error if ability format is ipv6 and value does match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "ipv6"
            },
            "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
          )
        ).toEqual(null);
      });

      it("should return error if ability format is uri and value does not match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "uri"
            },
            "foo"
          )
        ).toEqual("Not valid uri");
      });

      it("should not return error if ability format is uri and value does match", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              format: "uri"
            },
            "http://foo.com/foo"
          )
        ).toEqual(null);
      });

      it("should return error if value length is higher than ability maxLength", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              maxLength: 4
            },
            "fooooo"
          )
        ).toEqual("Must have a max length of 4");
      });

      it("should not return error if value length is not higher than ability maxLength", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              maxLength: 4
            },
            "foo"
          )
        ).toEqual(null);
      });

      it("should return error if value length is lower than ability minLength", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              minLength: 5
            },
            "foo"
          )
        ).toEqual("Must have a min length of 5");
      });

      it("should not return error if value length is not lower than ability minLength", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              minLength: 5
            },
            "foooooo"
          )
        ).toEqual(null);
      });

      it("should return error if value does not match ability pattern", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              pattern: "var"
            },
            "foo"
          )
        ).toEqual("Must match with pattern var");
      });

      it("should not return error if value does match ability pattern", () => {
        expect(
          validateAbilityData(
            {
              type: "string",
              pattern: "var$"
            },
            "var"
          )
        ).toEqual(null);
      });
    });
  });
});
