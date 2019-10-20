import { Selector } from "@xbyorange/mercury";
import { Api } from "@xbyorange/mercury-api";

import { socket } from "data/socket";

import { controllerModels, selectedController } from "./origins";

import { getAuthConfig } from "helpers/api";

const NO_CURRENT_CONTROLLER = "No current controller selected";

export const currentController = new Selector(
  selectedController,
  {
    source: controllerModels,
    query: (query, previousResults) => {
      if (!previousResults[0].id) {
        throw new Error(NO_CURRENT_CONTROLLER);
      }
      return controllerModels.customQueries.byId(previousResults[0].id);
    }
  },
  (currentControllerId, currentControllerResult) => currentControllerResult,
  []
);

const SelectedControllerSwitch = (origin, controllerBasedOrigin, defaultValue) => {
  return new Selector(
    {
      source: selectedController,
      query: selectedController.customQueries.id
    },
    {
      source: selectedController,
      query: selectedController.customQueries.isRequired
    },
    (currentSelectedController, selectedControllerIsRequired, query) => {
      if (selectedControllerIsRequired && !currentSelectedController) {
        return defaultValue;
      }
      return currentSelectedController
        ? controllerBasedOrigin.queryAddingController({
            query,
            controller: currentSelectedController
          })
        : origin.query(query);
    },
    defaultValue
  );
};

export const SelectedControllerBasedOrigin = (url, options, callback) => {
  const controllerBasedOriginUrl = `/controllers/:controllerId${url}`;
  const controllerBasedOrigin = new Api(
    controllerBasedOriginUrl,
    getAuthConfig(options && options.defaultValue, { ...options, uuid: controllerBasedOriginUrl })
  );

  controllerBasedOrigin.addCustomQuery({
    queryAddingController: queryAndCurrentController => ({
      ...queryAndCurrentController.query,
      urlParams: {
        ...(queryAndCurrentController.query && queryAndCurrentController.query.urlParams),
        controllerId: queryAndCurrentController.controller
      }
    })
  });

  socket.addListener(
    ["controllerToken:updated", "controllerToken:deleted", "controllerToken:created"],
    () => {
      controllerBasedOrigin.clean();
    }
  );

  const origin = new Api(url, { ...options, uuid: url });

  if (callback) {
    callback(origin, controllerBasedOrigin);
  }

  return SelectedControllerSwitch(origin, controllerBasedOrigin, options.defaultValue);
};
