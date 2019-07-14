export const isSystemRole = (user, rolesResults) => {
  const userRole = rolesResults.find(role => {
    return role.name === user.role;
  });
  return userRole ? userRole.isSystem : false;
};
