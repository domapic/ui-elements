import { Selector } from "@data-provider/core";
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
