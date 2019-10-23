import { isSystemRole } from "./roles";

describe("isSystemRole helper", () => {
  it("should return true if user role is a system role", () => {
    expect(
      isSystemRole(
        {
          role: "foo-role"
        },
        [
          {
            name: "foo-role",
            isSystem: true
          }
        ]
      )
    ).toEqual(true);
  });

  it("should return false if user role is not a system role", () => {
    expect(
      isSystemRole(
        {
          role: "foo-role"
        },
        [
          {
            name: "foo-role"
          }
        ]
      )
    ).toEqual(false);
  });

  it("should return false if user role is not a system role", () => {
    expect(
      isSystemRole(
        {
          role: "foo-role"
        },
        [
          {
            name: "foo-role",
            isSystem: false
          }
        ]
      )
    ).toEqual(false);
  });

  it("should return false if user role is not found", () => {
    expect(
      isSystemRole(
        {
          role: "foo-role"
        },
        [
          {
            name: "foo-role-2"
          }
        ]
      )
    ).toEqual(false);
  });
});
