import { usersCollectionExactFiltered } from "./selectors";

import { isEmail, isUserName } from "helpers/validators";

export const isValidUserName = isUserName;

export const isValidUserEmail = isEmail;

export const isUserNameRepeated = name =>
  usersCollectionExactFiltered
    .query({
      name
    })
    .read()
    .then(results => results.length > 0);

export const isUserEmailRepeated = email =>
  usersCollectionExactFiltered
    .query({
      email
    })
    .read()
    .then(results => results.length > 0);
