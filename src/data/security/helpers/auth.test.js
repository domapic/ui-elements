import sinon from "sinon";
import { apis } from "@xbyorange/mercury-api";

import { setJwtAuth, setApiKeyAuth, removeAuth } from "./auth";

describe("auth helpers", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(apis, "setHeaders").resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("setJwtAuth", () => {
    it("should set api headers with provided accesToken", () => {
      setJwtAuth("foo-access-token");
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({
        Authorization: "Bearer foo-access-token"
      });
    });
  });

  describe("setApiKeyAuth", () => {
    it("should set api headers with provided apiKey", () => {
      setApiKeyAuth("foo-api-key");
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({
        "X-Api-Key": "foo-api-key"
      });
    });
  });

  describe("removeAuth", () => {
    it("should set api headers as empty object", () => {
      removeAuth();
      expect(apis.setHeaders.getCall(0).args[0]).toEqual({});
    });
  });
});
