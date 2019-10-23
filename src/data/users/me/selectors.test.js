import { userAvatar } from "../avatar/selectors";
import { userMeWithExtraData, userMeIsAdmin } from "./selectors";

describe("userMeWithExtraData selector", () => {
  describe("userAvatar query", () => {
    it("should pass result of previous selector to byEmail userAvatar custom query", () => {
      expect(
        userMeWithExtraData.test.queries[0]({}, [
          {
            email: "foo"
          }
        ])
      ).toEqual(userAvatar.customQueries.byEmail("foo"));
    });
  });

  describe("results selector", () => {
    it("should add extra data about userMe and userAvatar results", () => {
      expect(
        userMeWithExtraData.test.selector(
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
        isSystemRole: true
      });
    });
  });
});

describe("userMeIsAdmin selector", () => {
  describe("results selector", () => {
    it("should return true is user role is admin", () => {
      expect(
        userMeIsAdmin.test.selector({
          role: "admin"
        })
      ).toEqual(true);
    });

    it("should return true is user role is anonymous", () => {
      expect(
        userMeIsAdmin.test.selector({
          role: "anonymous"
        })
      ).toEqual(true);
    });

    it("should return false is user role is not anonymous nor admin", () => {
      expect(
        userMeIsAdmin.test.selector({
          role: "foo-role"
        })
      ).toEqual(false);
    });
  });
});
