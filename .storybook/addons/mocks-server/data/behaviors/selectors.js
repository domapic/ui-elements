import { Selector } from "@data-provider/core";

import { behaviors, currentBehavior } from "./origins";

export const behaviorsNames = new Selector(
  behaviors,
  behaviorsResults => {
    return behaviorsResults.map(behavior => behavior.name);
  },
  []
);

export const currentBehaviorName = new Selector(
  currentBehavior,
  currentBehaviorResult => {
    return currentBehaviorResult.name;
  },
  ""
);

export const behaviorFixtures = new Selector(
  behaviors,
  (behaviorsResults, behaviorName) => {
    console.log(behaviorName);
    const fixtures = {};
    const behavior = behaviorsResults.find(behavior => behavior.name === behaviorName);
    // Remove duplicated urls. Keep last one, which is the one being applied by server
    behavior.fixtures.forEach(fixture => {
      fixtures[`${fixture.method}-${fixture.url}`] = fixture;
    });
    return Object.keys(fixtures).map(fixtureUrl => fixtures[fixtureUrl]);
  },
  []
);

export const behaviorFixturesDisplay = new Selector(
  {
    source: behaviorFixtures,
    query: query => query
  },
  behaviorFixturesResult => {
    return behaviorFixturesResult.map(fixture => ({
      name: `${fixture.method} ${fixture.url}`,
      data: fixture
    }));
  },
  []
);
