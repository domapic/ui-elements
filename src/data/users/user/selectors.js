import { Selector } from "@xbyorange/mercury";

import { isSystemRole } from "../helpers/user-roles";

import { roles } from "../roles/origins";
import { userAvatar } from "../avatar/selectors";
import { userModels } from "./origins";

export const userModelsWithExtraData = new Selector(
  {
    source: userModels,
    query: id => userModels.customQueries.byId(id)
  },
  {
    source: userAvatar,
    query: (query, previousResults) => userAvatar.customQueries.byEmail(previousResults[0].email)
  },
  roles,
  (userResults, avatarResult, rolesResults) => {
    return {
      ...userResults,
      ...avatarResult,
      isSystemRole: isSystemRole(userResults, rolesResults),
      isAnonymous: userResults.role === "anonymous"
    };
  },
  {}
);

userModelsWithExtraData.addCustomQuery({
  byId: id => id
});

export const userAllowedRoles = new Selector(
  roles,
  {
    source: userModelsWithExtraData,
    query: id => id
  },
  (rolesResults, userResults) => {
    if (userResults.isSystemRole) {
      return rolesResults.filter(role => role.name === userResults.role);
    }
    return rolesResults.filter(role => !role.isSystem);
  },
  []
);

userAllowedRoles.addCustomQuery({
  byId: id => id
});
