import { Selector } from "@xbyorange/mercury";

import { isSystemRole } from "../helpers/user-roles";
import { userAvatar } from "../avatar/selectors";
import { roles } from "../roles/origins";

import { userMe } from "./origins";

export const userMeWithExtraData = new Selector(
  userMe,
  {
    source: userAvatar,
    query: (query, results) => userAvatar.customQueries.byEmail(results[0].email)
  },
  roles,
  (userMeData, userAvatarResult, rolesResults) => ({
    ...userMeData,
    ...userAvatarResult,
    isSystemRole: isSystemRole(userMeData, rolesResults)
  }),
  {}
);

export const userMeIsAdmin = new Selector(
  userMe,
  userMeData => userMeData.role === "admin" || userMeData.role === "anonymous",
  false
);
