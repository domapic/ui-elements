export const byPageAndAbility = query => {
  const queryString = {};
  if (query) {
    if (query.page) {
      queryString.page = query.page;
    }
    if (query.ability) {
      queryString.ability = query.ability;
    }
    return {
      queryString
    };
  }
  return null;
};
