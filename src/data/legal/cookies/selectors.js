import { Selector } from "@xbyorange/mercury";
import { cookies } from "./origins";

export const cookiesAreAccepted = new Selector(
  {
    source: cookies,
    query: cookies._customQueries.accepted
  },
  cookiesResult => {
    return cookiesResult;
  }
);
