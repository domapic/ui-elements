import { userModels } from "./origins";
import { userAvatar } from "../avatar/selectors";
import { userModelsWithExtraData, userAllowedRoles } from "./selectors";

describe("userModelsWithExtraData selector", () => {
  describe("userModels query", () => {
    it("should pass query to byId userModels custom query", () => {
      expect(userModelsWithExtraData.test.queries[0]("foo-id")).toEqual(
        userModels.customQueries.byId("foo-id")
      );
    });
  });

  describe("userAvatar query", () => {
    it("should pass userModels email result to byEmail userAvatar custom query", () => {
      expect(userModelsWithExtraData.test.queries[1]({}, [{ email: "foo-email" }])).toEqual(
        userAvatar.customQueries.byEmail("foo-email")
      );
    });
  });

  describe("results selector", () => {
    it("should add extra data about avatar and role details", () => {
      expect(
        userModelsWithExtraData.test.selector(
          {
            name: "foo-user-name",
            role: "foo-role"
          },
          {
            avatar: "foo-user-avatar"
          },
          [
            {
              name: "foo-role",
              isSystem: true
            }
          ]
        )
      ).toEqual({
        name: "foo-user-name",
        role: "foo-role",
        avatar: "foo-user-avatar",
        isSystemRole: true,
        isAnonymous: false
      });
    });

    it("should add isAnonymous if user role is anonymous", () => {
      expect(
        userModelsWithExtraData.test.selector(
          {
            name: "foo-user-name",
            role: "anonymous"
          },
          {
            avatar: "foo-user-avatar"
          },
          [
            {
              name: "anonymous",
              isSystem: false
            }
          ]
        )
      ).toEqual({
        name: "foo-user-name",
        role: "anonymous",
        avatar: "foo-user-avatar",
        isSystemRole: false,
        isAnonymous: true
      });
    });
  });

  describe("custom queries", () => {
    describe("byId", () => {
      it("should return id", () => {
        expect(userModelsWithExtraData.test.customQueries.byId("foo-id")).toEqual("foo-id");
      });
    });
  });
});

describe("userAllowedRoles selector", () => {
  describe("userModelsWithExtraData query", () => {
    it("should bypass query ", () => {
      expect(userAllowedRoles.test.queries[0]("foo-query")).toEqual("foo-query");
    });
  });

  describe("results selector", () => {
    it("should return only user role if he has a system role", () => {
      expect(
        userAllowedRoles.test.selector(
          [
            {
              name: "foo-role-1",
              isSystem: true
            },
            {
              name: "foo-role-2",
              isSystem: false
            }
          ],
          {
            role: "foo-role-1",
            isSystemRole: true
          }
        )
      ).toEqual([
        {
          name: "foo-role-1",
          isSystem: true
        }
      ]);
    });

    it("should return non system roles if user has not a system role", () => {
      expect(
        userAllowedRoles.test.selector(
          [
            {
              name: "foo-role-1",
              isSystem: true
            },
            {
              name: "foo-role-2",
              isSystem: false
            },
            {
              name: "foo-role-3",
              isSystem: false
            }
          ],
          {
            role: "foo-role-2",
            isSystemRole: false
          }
        )
      ).toEqual([
        {
          name: "foo-role-2",
          isSystem: false
        },
        {
          name: "foo-role-3",
          isSystem: false
        }
      ]);
    });
  });

  describe("custom queries", () => {
    describe("byId", () => {
      it("should return id", () => {
        expect(userAllowedRoles.test.customQueries.byId("foo-id")).toEqual("foo-id");
      });
    });
  });
});
