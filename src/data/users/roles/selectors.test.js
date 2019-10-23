import { nonSystemRoles } from "./selectors";

describe("nonSystemRoles selector", () => {
  describe("results selector", () => {
    it("should return roles with noSystem property as false", () => {
      expect(
        nonSystemRoles.test.selector([
          {
            name: "foo-1",
            isSystem: false
          },
          {
            name: "foo-2",
            isSystem: true
          },
          {
            name: "foo-3",
            isSystem: false
          }
        ])
      ).toEqual([
        {
          name: "foo-1",
          isSystem: false
        },
        {
          name: "foo-3",
          isSystem: false
        }
      ]);
    });
  });
});
