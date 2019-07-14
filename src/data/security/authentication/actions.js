import { setApiKeyAuth, setJwtAuth } from "helpers/api";

import { sendLogin } from "data/analytics";

import {
  authSessionDetails,
  authSessionRemember,
  authSessionTemporal,
  authSessionStatus,
  authJwt,
  authGoogle
} from "./origins";

import { authSession } from "./selectors";

export const cleanAllAuthSessions = () => {
  return Promise.all([authSessionRemember.delete(), authSessionTemporal.delete()]);
};

export const doJwtLogin = userData => {
  return cleanAllAuthSessions().then(() => {
    return Promise.all([
      authJwt
        .create(userData)
        .then(result =>
          Promise.all([
            authSession.refreshToken().update(result.refreshToken),
            setJwtAuth(result.accessToken),
            authSessionStatus.isLogedIn().update(true),
            sendLogin("jwt")
          ])
        )
    ]);
  });
};

export const doApiKeyLogin = apiKey => {
  return cleanAllAuthSessions().then(() => {
    return Promise.all([authSession.apiKey().update(apiKey), setApiKeyAuth(apiKey)]);
  });
};

export const doGoogleOauthLogin = data => {
  return cleanAllAuthSessions().then(() => {
    return Promise.all([
      authGoogle.create(data).then(result => {
        return Promise.all([
          authSession.refreshToken().update(result.refreshToken),
          setJwtAuth(result.accessToken),
          authSessionStatus.isLogedIn().update(true),
          sendLogin("Google")
        ]);
      })
    ]);
  });
};

export const updateRemember = remember => {
  return authSessionDetails.rememberMe().update(remember);
};

export const updateIsLoginIn = isInLogin => authSessionStatus.isLoginIn().update(isInLogin);
