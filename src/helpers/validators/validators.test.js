import {
  isISO8601,
  isEmail,
  isIP,
  matches,
  isURL,
  isUserName,
  isPassword,
  controllerNameHasMinLength
} from "./index";

describe("validators helpers", () => {
  describe("isISO8601 method", () => {
    it("should return true if date is a valid ISO8601", () => {
      expect(isISO8601("19790515")).toBe(true);
    });

    it("should return false if date is not a valid ISO8601", () => {
      expect(isISO8601(new Date().getTime().toString())).toBe(false);
    });
  });

  describe("isEmail method", () => {
    it("should return true when valid email is provided", () => {
      expect(isEmail("foo@foo.com")).toBe(true);
    });

    it("should return false when not valid email is provided", () => {
      expect(isEmail("foo.com")).toBe(false);
    });
  });

  describe("isIP method", () => {
    it("should return true when valid ip is provided", () => {
      expect(isIP("192.168.1.1")).toBe(true);
    });

    it("should return false when not valid email is provided", () => {
      expect(isIP("http://foo.com")).toBe(false);
    });
  });

  describe("matches method", () => {
    it("should return true when provided string matches regex", () => {
      expect(matches("foo", /foo/i)).toBe(true);
    });

    it("should return false when provided string does not match regex", () => {
      expect(matches("foo", /var/i)).toBe(false);
    });
  });

  describe("isURL method", () => {
    it("should return true when provided string is a valid url", () => {
      expect(isURL("http://foo.com")).toBe(true);
    });

    it("should return true when provided string is a valid url without protocol", () => {
      expect(isURL("foo.com")).toBe(true);
    });

    it("should return false when provided string is not a valid url", () => {
      expect(isURL("foo")).toBe(false);
    });
  });

  describe("isUserName method", () => {
    it("should return true when provided string is a valid user name", () => {
      expect(isUserName("manolo")).toBe(true);
    });

    it("should return true when provided string is a valid user name and contains dashes", () => {
      expect(isUserName("man-olo")).toBe(true);
    });

    it("should return true when provided string is a valid user name and contains underscores", () => {
      expect(isUserName("man_olo")).toBe(true);
    });

    it("should return false when provided string has not enough length", () => {
      expect(isUserName("man")).toBe(false);
    });

    it("should return false when provided string contains strange characters", () => {
      expect(isUserName("manolo$")).toBe(false);
    });
  });

  describe("isPassword method", () => {
    it("should return true when provided string has more than 5 characters", () => {
      expect(isPassword("foo-password")).toBe(true);
    });

    it("should return false when provided string has less than 5 characters", () => {
      expect(isPassword("foo")).toBe(false);
    });
  });

  describe("controllerNameHasMinLength", () => {
    it("should return true when provided string has more than 4 characters", () => {
      expect(controllerNameHasMinLength("foo-controller")).toBe(true);
    });

    it("should return false when provided string has less than 4 characters", () => {
      expect(controllerNameHasMinLength("foo")).toBe(false);
    });
  });
});
