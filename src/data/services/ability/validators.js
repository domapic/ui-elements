import { isISO8601, isEmail, isIP, matches, isURL } from "helpers/validators";

export const validateAbilityData = (ability, value) => {
  const errors = [];
  if (ability.type === "number") {
    if (!/^-?(\d)*\.?(\d)*$/.test(value)) {
      errors.push("Not a valid number");
    } else {
      value = Number(value);
      if (ability.maxValue && value > ability.maxValue) {
        errors.push(`Maximum allowed value is ${ability.maxValue}`);
      }
      if (ability.minValue && value < ability.minValue) {
        errors.push(`Minimum allowed value is ${ability.minValue}`);
      }
      if (ability.multipleOf && value % ability.multipleOf !== 0) {
        errors.push(`Has to be multiple of ${ability.multipleOf}`);
      }
    }
  } else if (ability.type === "string") {
    value = value.toString();
    if (ability.format === "date-time" && !isISO8601(value)) {
      errors.push("Not valid ISO8601 date-time");
    } else if (ability.format === "email" && !isEmail(value)) {
      errors.push("Not valid email");
    } else if (
      ability.format === "hostname" &&
      !/^[a-z0-9]+([-.][a-z0-9]+)*\.[a-z]{2,}$/.test(value)
    ) {
      errors.push("Not valid hostname");
    } else if (ability.format === "ipv4" && !isIP(value, 4)) {
      errors.push("Not valid ipv4");
    } else if (ability.format === "ipv6" && !isIP(value, 6)) {
      errors.push("Not valid ipv6");
    } else if (
      ability.format === "uri" &&
      !isURL(value, {
        require_tld: false,
        allow_underscores: true,
        require_protocol: true
      })
    ) {
      errors.push("Not valid uri");
    }
    if (ability.maxLength && value.length > ability.maxLength) {
      errors.push(`Must have a max length of ${ability.maxLength}`);
    }
    if (ability.minLength && value.length < ability.minLength) {
      errors.push(`Must have a min length of ${ability.minLength}`);
    }
    if (ability.pattern && !matches(value, ability.pattern)) {
      errors.push(`Must match with pattern ${ability.pattern}`);
    }
  }
  return errors.length ? errors.join(". ") : null;
};
