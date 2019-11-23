import { Selector } from "@data-provider/core";

import { addAbilityExtraData } from "../helpers/ability";
import { modulesCollection } from "../services/selectors";

import { abilityModels, abilityStates } from "./origins";

export const abilityModelsWithExtraData = new Selector(
  {
    source: abilityModels,
    query: id => abilityModels.customQueries.byId(id)
  },
  modulesCollection,
  (abilityModel, modulesResults) => {
    return addAbilityExtraData(abilityModel, modulesResults);
  },
  {}
);

abilityModelsWithExtraData.addCustomQuery({
  byId: id => id
});

export const abilityStatesLoaded = new Selector(
  {
    source: abilityStates,
    query: id => abilityStates.customQueries.byId(id)
  },
  () => {
    return true;
  },
  false
);

abilityStatesLoaded.addCustomQuery({
  byId: id => id
});
