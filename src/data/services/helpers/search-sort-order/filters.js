import { sortBy } from "lodash";

export const searchByNameAndDescription = (servicesResults, search) => {
  if (!search) {
    return servicesResults;
  }
  return servicesResults.filter(
    service => service.name.indexOf(search) > -1 || service.description.indexOf(search) > -1
  );
};

export const sortAndOrderBy = (servicesResults, query) => {
  const results = sortBy(servicesResults, (query && query.sortBy) || "name");
  if (query.reverse) {
    return results.reverse();
  }
  return results;
};
