import { Selector } from "@xbyorange/mercury";

import { userAvatar } from "data/users/avatar/selectors";

import { cloudUserMe, cloudUserModels } from "./origins";

export const cloudUserMeWithExtraData = new Selector(
  cloudUserMe,
  {
    source: userAvatar,
    query: (query, results) => userAvatar.customQueries.byEmail(results[0].email)
  },
  (userMeData, userAvatarResult) => ({
    ...userMeData,
    ...userAvatarResult
  }),
  {}
);

export const cloudUserModelsWithExtraData = new Selector(
  {
    source: cloudUserModels,
    query: id => cloudUserModels.customQueries.byId(id)
  },
  {
    source: userAvatar,
    query: (query, previousResults) => userAvatar.customQueries.byEmail(previousResults[0].email)
  },
  (userResults, avatarResult) => {
    return {
      ...userResults,
      ...avatarResult
    };
  },
  {}
);

cloudUserModelsWithExtraData.addCustomQuery({
  byId: id => id
});
