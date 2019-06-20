import { cookies } from "./origins";

export const acceptCookies = () => {
  return cookies.accepted().update(true);
};

export const rejectCookies = () => {
  return cookies.accepted().update(false);
};

export const toggleCookies = value => {
  return cookies.accepted().update(value);
};
