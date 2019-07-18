export const methodToString = method => {
  const webpackAliasRegex = /([^\s]*?)(?:_)*WEBPACK_IMPORTED[^\s]*(?:(?:\["([\S]*)"\])|(?:default\(\)))/;
  return method.toString().replace(webpackAliasRegex, "$1$2");
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
