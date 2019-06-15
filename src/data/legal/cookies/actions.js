import { cookies } from "./origins";

export const acceptCookies = () => {
  return cookies.accepted().update(true);
};
