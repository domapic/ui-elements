import { Selector } from "@xbyorange/mercury";

import { searchByNameAndDescription, sortAndOrderBy } from "../helpers/search-sort-order";

import { servicesCollection } from "./origins";

export const modulesCollection = new Selector(
  {
    source: servicesCollection,
    query: () => servicesCollection.customQueries.type("module")
  },
  servicesResults => servicesResults,
  []
);

export const pluginsCollection = new Selector(
  {
    source: servicesCollection,
    query: () => servicesCollection.customQueries.type("plugin")
  },
  servicesResults => servicesResults,
  []
);

export const modulesCollectionFiltered = new Selector(
  modulesCollection,
  searchByNameAndDescription,
  []
);

export const pluginsCollectionFiltered = new Selector(
  pluginsCollection,
  searchByNameAndDescription,
  []
);

export const modulesCollectionFilteredAndSorted = new Selector(
  {
    source: modulesCollectionFiltered,
    query: (query = {}) => query.search
  },
  sortAndOrderBy,
  []
);

export const pluginsCollectionFilteredAndSorted = new Selector(
  {
    source: pluginsCollectionFiltered,
    query: (query = {}) => query.search
  },
  sortAndOrderBy,
  []
);
