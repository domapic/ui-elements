import * as sinon from "sinon";
import { appendStyleSheet } from "./index";

describe("appendStyleSheet function", () => {
  let sandbox;
  let createElementStub;
  let appendStub;
  let prependStub;
  let elementStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    elementStub = {
      addEventListener: () => {}
    };
    createElementStub = sandbox.stub(document, "createElement").returns(elementStub);
    appendStub = sandbox.stub(document.head, "append");
    prependStub = sandbox.stub(document.head, "prepend");
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("always", () => {
    it("should return nothing", () => {
      const result = appendStyleSheet("foo");
      expect(result).toEqual(undefined);
    });

    it("should create a link element", () => {
      appendStyleSheet("bar");
      expect(createElementStub.calledWithExactly("link")).toBe(true);
    });
  });

  describe("with no options", () => {
    it("should add the link element to the head using append", () => {
      appendStyleSheet("sur");
      expect(appendStub.calledWithExactly(elementStub)).toBe(true);
    });
  });

  describe("using method options with prepend value", () => {
    it("should add the link element to the head using prepend", () => {
      appendStyleSheet("sur", {
        method: "prepend"
      });
      expect(prependStub.calledWithExactly(elementStub)).toBe(true);
    });
  });
});
