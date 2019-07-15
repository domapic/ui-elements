import sinon from "sinon";
import { googleAnalytics } from "./origins";
import { sendPage, sendLogin, sendSignup, sendEvent, enableAnalytics } from "./actions";

describe("cookies actions", () => {
  let sandbox;
  let update;
  let read;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    read = sandbox.stub(googleAnalytics, "read").resolves({
      enabled: true
    });
    update = sandbox.stub(googleAnalytics, "update").resolves();
    global.gtag = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("sendPage", () => {
    it("should not send page data to google gtag if analytics is not activated", async () => {
      read.resolves({
        enabled: false
      });
      await sendPage("/foo/url");
      expect(global.gtag.callCount).toEqual(0);
    });

    it("should send page data to google gtag if analytics is activated", async () => {
      await sendPage("/foo/url");
      expect(global.gtag.getCall(0).args[0]).toEqual("config");
      expect(global.gtag.getCall(0).args[2]).toEqual({
        page_title: "Foo Url",
        page_path: "/foo/url"
      });
    });

    it("should remove ids from urls sent to analytics", async () => {
      await sendPage("/foo/url/dasdasdeq3r4frgfgfddgfgfl3234q4fsf/testing");
      expect(global.gtag.getCall(0).args[0]).toEqual("config");
      expect(global.gtag.getCall(0).args[2]).toEqual({
        page_title: "Foo Url Testing",
        page_path: "/foo/url/testing"
      });
    });

    it("should send home page data to google gtag if page path is /", async () => {
      await sendPage("/");
      expect(global.gtag.getCall(0).args[0]).toEqual("config");
      expect(global.gtag.getCall(0).args[2]).toEqual({
        page_title: "Home",
        page_path: "/"
      });
    });
  });

  describe("sendLogin", () => {
    it("should not send login event if analytics is not activated", async () => {
      read.resolves({
        enabled: false
      });
      await sendLogin("foo");
      expect(global.gtag.callCount).toEqual(0);
    });

    it("should send login data if analytics is activated", async () => {
      await sendLogin("foo");
      expect(global.gtag.getCall(0).args[0]).toEqual("event");
      expect(global.gtag.getCall(0).args[1]).toEqual("login");
      expect(global.gtag.getCall(0).args[2]).toEqual({
        method: "foo"
      });
    });
  });

  describe("sendSignup", () => {
    it("should not send signup event if analytics is not activated", async () => {
      read.resolves({
        enabled: false
      });
      await sendSignup();
      expect(global.gtag.callCount).toEqual(0);
    });

    it("should send signup event if analytics is activated", async () => {
      await sendSignup();
      expect(global.gtag.getCall(0).args[0]).toEqual("event");
      expect(global.gtag.getCall(0).args[1]).toEqual("sign_up");
      expect(global.gtag.getCall(0).args[2]).toEqual({
        method: "register"
      });
    });
  });

  describe("sendEvent", () => {
    it("should not send event if analytics is not activated", async () => {
      read.resolves({
        enabled: false
      });
      await sendEvent("foo-action", "foo-category");
      expect(global.gtag.callCount).toEqual(0);
    });

    it("should send signup event if analytics is activated", async () => {
      await sendEvent("foo-action", "foo-category");
      expect(global.gtag.getCall(0).args[0]).toEqual("event");
      expect(global.gtag.getCall(0).args[1]).toEqual("foo-action");
      expect(global.gtag.getCall(0).args[2]).toEqual({
        event_category: "foo-category"
      });
    });
  });

  describe("enableAnalytics", () => {
    it("should enable googleAnalytics origin with provided id", async () => {
      await enableAnalytics("foo-id");
      expect(update.getCall(0).args[0]).toEqual({
        enabled: true,
        id: "foo-id"
      });
    });
  });
});
