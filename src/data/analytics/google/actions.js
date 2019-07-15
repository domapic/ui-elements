import { startCase } from "lodash";

import { googleAnalytics } from "./origins";

const URL_SEP = "/";

const pageTitle = pageUrl => startCase(pageUrl);

const removeUrlIds = url => {
  return url
    .split(URL_SEP)
    .filter(fragment => fragment.length < 15)
    .join(URL_SEP);
};

const sendIfEnabled = sendEvent => {
  return googleAnalytics.read().then(analytics => {
    if (analytics.enabled) {
      sendEvent(analytics);
    }
  });
};

export const sendPage = pageUrl => {
  sendIfEnabled(analytics => {
    const cleanUrl = removeUrlIds(pageUrl);
    window.gtag("config", analytics.id, {
      page_title: cleanUrl === "/" ? "Home" : pageTitle(cleanUrl),
      page_path: cleanUrl
    });
  });
};

export const sendLogin = method => {
  sendIfEnabled(() =>
    window.gtag("event", "login", {
      method
    })
  );
};

export const sendSignup = () => {
  sendIfEnabled(() =>
    window.gtag("event", "sign_up", {
      method: "register"
    })
  );
};

export const sendEvent = (action, category) => {
  sendIfEnabled(() =>
    window.gtag("event", action, {
      event_category: category
    })
  );
};

export const enableAnalytics = id => {
  return googleAnalytics.update({
    enabled: true,
    id
  });
};
