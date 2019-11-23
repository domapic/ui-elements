import { Memory } from "@data-provider/memory";

const ROLES = [
  {
    name: "admin",
    isSystem: false
  },
  {
    name: "operator",
    isSystem: false
  },
  {
    name: "module",
    isSystem: true
  },
  {
    name: "plugin",
    isSystem: true
  },
  {
    name: "service-registerer",
    isSystem: true
  },
  {
    name: "anonymous",
    isSystem: true
  }
];

export const roles = new Memory(ROLES);
