export const TAGS = {
  NEED_AUTH: "need_auth"
};

export const getAuthConfig = (defaultValue, options) => {
  return {
    tags: [TAGS.NEED_AUTH],
    defaultValue,
    ...options
  };
};
