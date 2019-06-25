import { isArray, isFunction } from "lodash";

const findNameAndDomain = (source, domains) => {
  let found = false;
  let name;
  let domain;

  if (domains) {
    Object.keys(domains).forEach(domainName => {
      Object.keys(domains[domainName]).forEach(sourceName => {
        if (!found && source._id.indexOf(domains[domainName][sourceName]._id) === 0) {
          found = true;
          name = sourceName;
          domain = domainName;
        }
      });
    });
  }

  if (found) {
    return {
      name,
      domain
    };
  }
  return null;
};

const methodToString = method => {
  const webpackAliasRegex = /[^\s]*_WEBPACK_IMPORTED[^\s]*\["([\S]*)"\]/;
  return method.toString().replace(webpackAliasRegex, "$1");
};

const getCustomQueries = source => {
  const sourceCustomQueries = source._customQueries && Object.keys(source._customQueries);
  if (sourceCustomQueries && sourceCustomQueries.length > 0) {
    const customQueries = {};
    sourceCustomQueries.forEach(customQueryName => {
      customQueries[customQueryName] = methodToString(source._customQueries[customQueryName]);
    });
    return customQueries;
  }
  return null;
};

const getSourceConstructor = source => {
  const funcNameRegex = /function (.{1,})\(/;
  const results = funcNameRegex.exec(source.constructor.toString());
  return results && results.length > 1 ? results[1] : "";
};

const getQueries = (source, domains, sourceConstructor) => {
  let queries;
  if (source._queries) {
    Object.keys(source._queries).forEach(queryName => {
      if (queryName && source._queries[queryName]._queryId) {
        queries = queries || {};
        queries[source._queries[queryName]._queryId] = parseSourceContent(
          source._queries[queryName],
          domains,
          sourceConstructor
        );
      }
    });
  }
  return queries;
};

const getSources = (sources, domains) => {
  return sources.map(source => {
    if (isArray(source)) {
      return getSources(source, domains);
    }
    if (source.source) {
      let sourceObject = {
        source: parseSourceContent(source.source, domains)
      };
      if (source.query) {
        sourceObject.query = methodToString(source.query);
      }
      if (source.catch) {
        sourceObject.catch = methodToString(source.catch);
      }
      return sourceObject;
    }
    return parseSourceContent(source, domains);
  });
};

const parseSourceContent = (source, domains, constructorName) => {
  const sourceConstructor = constructorName || getSourceConstructor(source);
  const queries = getQueries(source, domains, sourceConstructor);
  const nameAndDomain = findNameAndDomain(source, domains);
  const customQueries = getCustomQueries(source);
  let display = {};
  if (nameAndDomain) {
    display.name = nameAndDomain.name;
    display.domain = nameAndDomain.domain;
  }

  display = {
    ...display,
    type: sourceConstructor,
    id: source._id,
    read: {
      value: source.read.value,
      error: source.read.error,
      loading: source.read.loading
    }
  };
  if (nameAndDomain) {
    display.name = nameAndDomain.name;
    display.domain = nameAndDomain.domain;
  }
  if (source._sources) {
    display.sources = getSources(source._sources, domains);
  }
  if (source._queryId) {
    display.query = source._queryId;
  }
  if (queries) {
    display.queries = queries;
  }
  if (customQueries) {
    display.customQueries = customQueries;
  }

  return display;
};

const parseSource = (source, domains) => {
  let sourceName;

  if (domains) {
    sourceName = findNameAndDomain(source, domains);
  }

  if (source.name || sourceName) {
    return {
      name: source.name || sourceName.name,
      data: parseSourceContent(source, domains)
    };
  }
  return {
    name: source._id,
    data: parseSourceContent(source, domains)
  };
};

export const parseSources = (sources, domains) => {
  if (!sources) {
    return [];
  }
  return sources.map(source => parseSource(source, domains));
};

const getActionName = (action, domains) => {
  if (action.name) {
    return action.name;
  }
  const stringAction = action.toString();
  let name = null;

  if (domains) {
    Object.keys(domains).forEach(domainName => {
      Object.keys(domains[domainName]).forEach(sourceName => {
        if (!name && domains[domainName][sourceName].toString() === stringAction) {
          name = sourceName;
        }
      });
    });
  }

  return name;
};

const getActionDetails = (action, domains) => {
  if (!isFunction(action) && action.name) {
    return action;
  }
  const method = action.action || action;
  const parsed = {
    name: getActionName(method, domains),
    action: method,
    code: methodToString(method)
  };
  if (action.value) {
    parsed.value = action.value;
  }
  return parsed;
};

export const parseActions = (actions, domains) => {
  if (!actions) {
    return [];
  }
  return actions.map(action => getActionDetails(action, domains));
};

export const parseAll = (data, domains) => {
  let result = {};
  if (data._isSource) {
    return {
      sources: [parseSource(data, domains)]
    };
  }
  if (isFunction(data)) {
    return {
      actions: [getActionDetails(data, domains)]
    };
  }
  if (isArray(data)) {
    data.forEach(dataItem => {
      if (dataItem._isSource) {
        result.sources = result.sources || [];
        result.sources.push(parseSource(dataItem, domains));
      } else if (isFunction(dataItem)) {
        result.actions = result.actions || [];
        result.actions.push(getActionDetails(dataItem, domains));
      }
    });
    return result;
  }
  Object.keys(data).forEach(dataKey => {
    if (data[dataKey]._isSource) {
      result.sources = result.sources || [];
      result.sources.push(parseSource(data[dataKey], domains));
    } else if (isFunction(data[dataKey])) {
      result.actions = result.actions || [];
      result.actions.push(getActionDetails(data[dataKey], domains));
    }
  });
  return result;
};
