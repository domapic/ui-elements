import { Selector } from "@data-provider/core";

import { roles } from "./origins";

export const nonSystemRoles = new Selector(
  roles,
  rolesResults => rolesResults.filter(role => !role.isSystem),
  []
);
