import {
  usersCollectionWithExtraData,
  usersCollectionExactFiltered,
  usersCollectionFiltered,
  usersCollectionFilteredAndSorted
} from "./selectors";

describe("usersCollectionWithExtraData selector", () => {
  describe("results selector", () => {
    it("should add extra data about role details", () => {
      expect(
        usersCollectionWithExtraData.test.selector(
          [
            {
              name: "foo-user-name",
              role: "foo-role"
            },
            {
              name: "foo-user-name-2",
              role: "foo-role-2"
            }
          ],
          [
            {
              name: "foo-role",
              isSystem: true
            },
            {
              name: "foo-role-2",
              isSystem: false
            }
          ]
        )
      ).toEqual([
        {
          name: "foo-user-name",
          role: "foo-role",
          isSystemRole: true
        },
        {
          name: "foo-user-name-2",
          role: "foo-role-2",
          isSystemRole: false
        }
      ]);
    });
  });
});

describe("usersCollectionExactFiltered selector", () => {
  describe("results selector", () => {
    it("should filter results by email if email filter is provided", () => {
      expect(
        usersCollectionExactFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              role: "foo-role",
              email: "foo-email-1"
            },
            {
              name: "foo-user-name-2",
              role: "foo-role-2",
              email: "foo-email-2"
            }
          ],
          {
            email: "foo-email-1"
          }
        )
      ).toEqual([
        {
          name: "foo-user-name",
          role: "foo-role",
          email: "foo-email-1"
        }
      ]);
    });

    it("should filter results by name if name filter is provided", () => {
      expect(
        usersCollectionExactFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              role: "foo-role",
              email: "foo-email-1"
            },
            {
              name: "foo-user-name-2",
              role: "foo-role-2",
              email: "foo-email-2"
            }
          ],
          {
            name: "foo-user-name-2"
          }
        )
      ).toEqual([
        {
          name: "foo-user-name-2",
          role: "foo-role-2",
          email: "foo-email-2"
        }
      ]);
    });

    it("should not return results if name and email filters are provided and both does not match", () => {
      expect(
        usersCollectionExactFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              role: "foo-role",
              email: "foo-email-1"
            },
            {
              name: "foo-user-name-2",
              role: "foo-role-2",
              email: "foo-email-2"
            }
          ],
          {
            name: "foo-user-name-2",
            email: "foo-user"
          }
        )
      ).toEqual([]);
    });

    it("should filter results by name and email if name and email filters are provided", () => {
      expect(
        usersCollectionExactFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              role: "foo-role",
              email: "foo-email-1"
            },
            {
              name: "foo-user-name-2",
              role: "foo-role-2",
              email: "foo-email-2"
            }
          ],
          {
            name: "foo-user-name-2",
            email: "foo-email-2"
          }
        )
      ).toEqual([
        {
          name: "foo-user-name-2",
          role: "foo-role-2",
          email: "foo-email-2"
        }
      ]);
    });
  });
});

describe("usersCollectionFiltered selector", () => {
  describe("results selector", () => {
    it("should filter all users with system role if showSystem filter is disabled", () => {
      expect(
        usersCollectionFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              isSystemRole: true
            },
            {
              name: "foo-user-name-2",
              isSystemRole: false
            }
          ],
          {
            showSystem: false
          }
        )
      ).toEqual([
        {
          name: "foo-user-name-2",
          isSystemRole: false
        }
      ]);
    });

    it("should not filter users with system role if showSystem filter is enabled", () => {
      expect(
        usersCollectionFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              isSystemRole: true
            },
            {
              name: "foo-user-name-2",
              isSystemRole: false
            }
          ],
          {
            showSystem: true
          }
        )
      ).toEqual([
        {
          name: "foo-user-name",
          isSystemRole: true
        },
        {
          name: "foo-user-name-2",
          isSystemRole: false
        }
      ]);
    });

    it("should not apply search filter if it not provided", () => {
      expect(
        usersCollectionFiltered.test.selector([
          {
            name: "foo-user-name",
            isSystemRole: true
          },
          {
            name: "foo-user-name-2",
            isSystemRole: false
          }
        ])
      ).toEqual([
        {
          name: "foo-user-name-2",
          isSystemRole: false
        }
      ]);
    });

    it("should return results containing searched string in name", () => {
      expect(
        usersCollectionFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              isSystemRole: false,
              role: "foo"
            },
            {
              name: "foo-user-name-2",
              isSystemRole: false,
              role: "foo"
            }
          ],
          {
            search: "e-2"
          }
        )
      ).toEqual([
        {
          name: "foo-user-name-2",
          isSystemRole: false,
          role: "foo"
        }
      ]);
    });

    it("should return results containing searched string in email", () => {
      expect(
        usersCollectionFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              email: "foo-email",
              role: "foo"
            },
            {
              name: "foo-user-name-2",
              email: "var-email",
              role: "foo"
            }
          ],
          {
            search: "var"
          }
        )
      ).toEqual([
        {
          name: "foo-user-name-2",
          email: "var-email",
          role: "foo"
        }
      ]);
    });

    it("should return results containing searched string in role", () => {
      expect(
        usersCollectionFiltered.test.selector(
          [
            {
              name: "foo-user-name",
              email: "foo-email",
              role: "var"
            },
            {
              name: "foo-user-name-2",
              email: "foo-email",
              role: "foo"
            }
          ],
          {
            search: "var"
          }
        )
      ).toEqual([
        {
          name: "foo-user-name",
          email: "foo-email",
          role: "var"
        }
      ]);
    });
  });
});

describe("usersCollectionFilteredAndSorted selector", () => {
  describe("usersCollectionFiltered query", () => {
    it("should bypass query", () => {
      expect(usersCollectionFilteredAndSorted.test.queries[0]("foo-query")).toEqual("foo-query");
    });
  });

  describe("results selector", () => {
    it("should return results sorted by name if no sortBy is provided", () => {
      expect(
        usersCollectionFilteredAndSorted.test.selector([
          {
            name: "c"
          },
          {
            name: "b"
          },
          {
            name: "a"
          }
        ])
      ).toEqual([
        {
          name: "a"
        },
        {
          name: "b"
        },
        {
          name: "c"
        }
      ]);
    });

    it("should return results sorted by sortBy key if it is provided", () => {
      expect(
        usersCollectionFilteredAndSorted.test.selector(
          [
            {
              foo: "c"
            },
            {
              foo: "b"
            },
            {
              foo: "a"
            }
          ],
          {
            sortBy: "foo"
          }
        )
      ).toEqual([
        {
          foo: "a"
        },
        {
          foo: "b"
        },
        {
          foo: "c"
        }
      ]);
    });

    it("should return results sorted by name reverse if reserve option is provided", () => {
      expect(
        usersCollectionFilteredAndSorted.test.selector(
          [
            {
              name: "b"
            },
            {
              name: "a"
            },
            {
              name: "c"
            }
          ],
          {
            reverse: true
          }
        )
      ).toEqual([
        {
          name: "c"
        },
        {
          name: "b"
        },
        {
          name: "a"
        }
      ]);
    });

    it("should return results sorted by sortBy key reverse if reserve option is provided", () => {
      expect(
        usersCollectionFilteredAndSorted.test.selector(
          [
            {
              foo: "b"
            },
            {
              foo: "a"
            },
            {
              foo: "c"
            }
          ],
          {
            reverse: true,
            sortBy: "foo"
          }
        )
      ).toEqual([
        {
          foo: "c"
        },
        {
          foo: "b"
        },
        {
          foo: "a"
        }
      ]);
    });
  });
});
