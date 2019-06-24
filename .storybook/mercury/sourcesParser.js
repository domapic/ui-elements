import { isArray } from "lodash";

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

const getCustomQueries = source => {
  const sourceCustomQueries = source._customQueries && Object.keys(source._customQueries);
  if (sourceCustomQueries && sourceCustomQueries.length > 0) {
    const customQueries = {};
    sourceCustomQueries.forEach(customQueryName => {
      customQueries[customQueryName] = source._customQueries[customQueryName].toString();
    });
    return customQueries;
  }
  return null;
};

const getSourceConstructor = source => {
  var funcNameRegex = /function (.{1,})\(/;
  var results = funcNameRegex.exec(source.constructor.toString());
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
        sourceObject.query = source.query.toString();
      }
      if (source.catch) {
        sourceObject.catch = source.catch.toString();
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

export const parseSource = (source, domains) => {
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
  return sources.map(source => parseSource(source, domains));
};
