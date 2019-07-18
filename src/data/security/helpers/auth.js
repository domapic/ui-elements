import { apis } from "@xbyorange/mercury-api";
import { TAGS } from "helpers/api";

const JWT_HEADER = "Authorization";
const API_KEY_HEADER = "X-Api-Key";

export const setJwtAuth = token => {
  apis.setHeaders(
    {
      [JWT_HEADER]: `Bearer ${token}`
    },
    TAGS.NEED_AUTH
  );
};

export const setApiKeyAuth = token => {
  apis.setHeaders(
    {
      [API_KEY_HEADER]: token
    },
    TAGS.NEED_AUTH
  );
};

export const removeAuth = () => {
  apis.setHeaders({}, TAGS.NEED_AUTH);
};
