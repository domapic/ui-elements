import { cookies } from "./origins";

import "./actions.scss";

export const acceptCookies = () => {
  return cookies.accepted().update(true);
};
