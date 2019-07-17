import { Selector } from "@xbyorange/mercury";

import { searchByNameAndDescription, sortAndOrderBy } from "../helpers/search-sort-order";
import { addAbilityExtraData } from "../helpers/ability";

import { abilitiesCollection } from "./origins";
import { modulesCollection } from "../services/selectors";

export const abilitiesCollectionWithExtraData = new Selector(
  {
    source: abilitiesCollection,
    query: abilitiesCollection.customQueries.ofService
  },
  modulesCollection,
  (abilitiesCollectionResults, modulesCollectionResults) => {
    return abilitiesCollectionResults.map(ability => {
      return addAbilityExtraData(ability, modulesCollectionResults);
    });
  },
  []
);

abilitiesCollectionWithExtraData.addCustomQuery({
  ofService: serviceId => serviceId
});

export const abilitiesCollectionFiltered = new Selector(
  abilitiesCollectionWithExtraData,
  searchByNameAndDescription,
  []
);

export const abilitiesCollectionFilteredAndSorted = new Selector(
  {
    source: abilitiesCollectionFiltered,
    query: (query = {}) => query.search
  },
  sortAndOrderBy,
  []
);
