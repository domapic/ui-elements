import { Selector } from "@data-provider/core";

import { displayValue, formatDate } from "helpers/formatters";

import { abilitiesCollection } from "../abilities/origins";
import { servicesCollection } from "../services/origins";
import { byPageAndAbility } from "./filters";
import { logs } from "./origins";

export const logsPage = new Selector(
  {
    source: logs,
    query: byPageAndAbility
  },
  logsResults => logsResults,
  []
);

export const logsPageLoaded = new Selector(
  {
    source: logs,
    query: byPageAndAbility
  },
  () => true,
  false
);

export const logsPageWithDetails = new Selector(
  abilitiesCollection,
  servicesCollection,
  {
    source: logsPage,
    query: query => query
  },
  (abilitiesResults, servicesResults, logsResults) => {
    return logsResults.map(log => {
      const ability = abilitiesResults.find(abilityData => abilityData._id === log._ability);
      const service =
        ability && servicesResults.find(serviceData => serviceData._id === ability._service);
      return {
        ...log,
        dateTime: formatDate(log.createdAt),
        module: (service && service.name) || "-",
        ability: (ability && ability.name) || "-",
        data: displayValue(log.data)
      };
    });
  },
  []
);

export const logsPageWithDetailsLoaded = new Selector(
  {
    source: logsPageWithDetails,
    query: query => query
  },
  () => {
    return true;
  },
  false
);
