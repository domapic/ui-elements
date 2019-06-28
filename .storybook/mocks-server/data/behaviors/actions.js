import { currentBehavior } from "./origins";

export const changeBehavior = behavior =>
  currentBehavior.update({
    name: behavior
  });
