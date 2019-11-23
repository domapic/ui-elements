import md5 from "md5";

import { Selector } from "@data-provider/core";

import { gravatar } from "./origins";

export const userAvatar = new Selector(
  {
    source: gravatar,
    query: query => query
  },
  gravatarResponse => {
    return {
      avatar: gravatarResponse.status === 200 ? gravatarResponse.request.responseURL : null
    };
  }
);

userAvatar.addCustomQuery({
  byEmail: (email = "") => ({
    urlParams: {
      hash: md5(email.toLowerCase())
    },
    queryString: {
      d: 404
    }
  })
});
