export const byIdQuery = id => {
  if (id) {
    return {
      urlParams: {
        id
      }
    };
  }
};

export const byKeyQuery = key => {
  return {
    urlParams: {
      key
    }
  };
};
