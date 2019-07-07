import * as sinon from "sinon";
import { appendStyleSheet } from "./index";

describe("appendStyleSheet function", () => {
  let sandbox;
  let createElementStub;
  let appendChildStub;
  let elementStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    elementStub = {
      addEventListener: () => {}
    };
    createElementStub = sandbox.stub(document, "createElement").returns(elementStub);
    appendChildStub = sandbox.stub(document.head, "appendChild");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return nothing", () => {
    const result = appendStyleSheet("foo");
    expect(result).toEqual(undefined);
  });

  it("should create a link element", () => {
    appendStyleSheet("bar");
    expect(createElementStub.calledWithExactly("link")).toBe(true);
  });

  it("should add the link element to the head", () => {
    appendStyleSheet("sur");
    expect(appendChildStub.calledWithExactly(elementStub)).toBe(true);
  });
});
