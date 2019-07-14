export const addAbilityExtraData = (ability, modulesCollection) => {
  const serviceOwner = modulesCollection.find(module => module._id === ability._service);
  return {
    ...ability,
    serviceName: serviceOwner && serviceOwner.name,
    maxValue: ability.hasOwnProperty("maximum")
      ? ability.exclusiveMaximum
        ? ability.maximum - 1
        : ability.maximum
      : null,
    minValue: ability.hasOwnProperty("minimum")
      ? ability.exclusiveMinimum
        ? ability.minimum + 1
        : ability.minimum
      : null
  };
};
