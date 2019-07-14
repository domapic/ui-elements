import { SelectedControllerBasedOrigin } from "data/controllers";
import { socket } from "data/socket";

// SERVICES COLLECTION

export const servicesCollection = SelectedControllerBasedOrigin(
  "/services",
  {
    defaultValue: []
  },
  (origin, controllerBasedOrigin) => {
    socket.addListener(["service:created", "service:updated", "service:deleted"], () => {
      origin.clean();
      controllerBasedOrigin.clean();
    });
  }
);

servicesCollection.addCustomQuery({
  type: serviceType => {
    if (serviceType && serviceType.length) {
      return {
        queryString: {
          type: serviceType
        }
      };
    }
  }
});
