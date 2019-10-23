import sinon from "sinon";
import { usersCollectionExactFiltered } from "./selectors";
import { isUserNameRepeated, isUserEmailRepeated } from "./validators";

describe("users validators", () => {
  let sandbox;
  let read;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    read = sandbox.stub().resolves([]);
    sandbox.stub(usersCollectionExactFiltered, "query").returns({
      read
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("isUserNameRepeated helper", () => {
    it("should pass name to query usersCollectionExactFiltered", async () => {
      expect.assertions(1);
      await isUserNameRepeated("foo-name");
      expect(usersCollectionExactFiltered.query.getCall(0).args[0]).toEqual({ name: "foo-name" });
    });

    it("should return true if usersCollectionExactFiltered returns any element", async () => {
      expect.assertions(1);
      read.resolves([{ name: "foo" }]);
      const isRepeated = await isUserNameRepeated("foo-name");
      expect(isRepeated).toEqual(true);
    });

    it("should return false if usersCollectionExactFiltered does not return elements", async () => {
      expect.assertions(1);
      const isRepeated = await isUserNameRepeated("foo-name");
      expect(isRepeated).toEqual(false);
    });
  });

  describe("isUserEmailRepeated helper", () => {
    it("should pass email to query usersCollectionExactFiltered", async () => {
      expect.assertions(1);
      await isUserEmailRepeated("foo-email");
      expect(usersCollectionExactFiltered.query.getCall(0).args[0]).toEqual({
        email: "foo-email"
      });
    });

    it("should return true if usersCollectionExactFiltered returns any element", async () => {
      expect.assertions(1);
      read.resolves([{ email: "foo" }]);
      const isRepeated = await isUserEmailRepeated("foo-name");
      expect(isRepeated).toEqual(true);
    });

    it("should return false if usersCollectionExactFiltered does not return elements", async () => {
      expect.assertions(1);
      const isRepeated = await isUserEmailRepeated("foo-name");
      expect(isRepeated).toEqual(false);
    });
  });
});
