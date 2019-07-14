import { Selector } from "@xbyorange/mercury";

import { roles } from "./origins";

export const nonSystemRoles = new Selector(
  roles,
  rolesResults => rolesResults.filter(role => !role.isSystem),
  []
);
