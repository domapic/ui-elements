import { apis } from "@xbyorange/mercury-api";

const JWT_HEADER = "Authorization";
const API_KEY_HEADER = "X-Api-Key";

export const TAGS = {
  NEED_AUTH: "need_auth"
};

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

export const getAuthConfig = (defaultValue, options) => {
  return {
    tags: [TAGS.NEED_AUTH],
    defaultValue,
    ...options
  };
};
