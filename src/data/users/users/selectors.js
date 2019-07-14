import { sortBy } from "lodash";
import { Selector } from "@xbyorange/mercury";

import { isSystemRole } from "../helpers/user-roles";

import { roles } from "../roles/origins";
import { usersCollection } from "./origins";

export const usersCollectionWithExtraData = new Selector(
  usersCollection,
  roles,
  (usersResults, rolesResults) => {
    return usersResults.map(user => ({
      ...user,
      isSystemRole: isSystemRole(user, rolesResults)
    }));
  },
  []
);

export const usersCollectionExactFiltered = new Selector(
  usersCollection,
  (usersResults, { email, name }) => {
    return usersResults.filter(user => {
      let matchKeys = 0;
      let matches = 0;
      if (email) {
        matchKeys++;
        if (user.email === email) {
          matches++;
        }
      }
      if (name) {
        matchKeys++;
        if (user.name === name) {
          matches++;
        }
      }
      return matchKeys === matches;
    });
  },
  []
);

export const usersCollectionFiltered = new Selector(
  usersCollectionWithExtraData,
  (usersResults, { search, showSystem }) => {
    return usersResults.filter(user => {
      if (!showSystem && user.isSystemRole) {
        return false;
      }
      if (!search) {
        return true;
      }
      return (
        user.name.indexOf(search) > -1 ||
        (user.email && user.email.indexOf(search) > -1) ||
        user.role.indexOf(search) > -1
      );
    });
  },
  []
);

export const usersCollectionFilteredAndSorted = new Selector(
  {
    source: usersCollectionFiltered,
    query: ({ search, showSystem }) => ({ search, showSystem })
  },
  (usersResults, query) => {
    const results = sortBy(usersResults, (query && query.sortBy) || "name");
    if (query.reverse) {
      return results.reverse();
    }
    return results;
  },
  []
);
