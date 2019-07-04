export const methodToString = method => {
  const webpackAliasRegex = /[^\s]*_WEBPACK_IMPORTED[^\s]*\["([\S]*)"\]/;
  return method.toString().replace(webpackAliasRegex, "$1");
};

export const parseHelper = helper => {
  return {
    name: helper.name,
    code: methodToString(helper)
  };
};

export const displayValue = (helper, [...args]) => {
  let value;
  try {
    value = helper.apply(null, args);
  } catch (err) {
    value = err;
  }

  return value;
};
