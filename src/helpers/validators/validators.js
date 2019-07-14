import validator from "validator";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const NAME_REGEX = /^[a-z0-9_.-]*$/;

export const isISO8601 = validator.isISO8601;

export const isEmail = value => EMAIL_REGEX.test(value);

export const isIP = validator.isIP;

export const matches = validator.matches;

export const isURL = validator.isURL;

export const isUserName = name => name.length > 4 && NAME_REGEX.test(name);

export const isPassword = password => password.length > 5;

export const controllerNameHasMinLength = controllerName => controllerName.length > 4;
