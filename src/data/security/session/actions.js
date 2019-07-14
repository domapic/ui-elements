"use strict";

import { apis } from "@xbyorange/mercury-api";

import queryString from "query-string";

import { removeAuth, setJwtAuth, setApiKeyAuth } from "helpers/api";
import { socket } from "data/socket";
import { acceptCookies } from "data/legal";

import { authJwt, authSessionDetails, authSessionStatus } from "../authentication/origins";
import { authSession } from "../authentication/selectors";

class Session {
  constructor() {
    this._doLogin = this._doLogin.bind(this);
    this._refreshToken = authSession.refreshToken();
    this._apiKey = authSession.apiKey();
    this._remember = authSessionDetails.rememberMe();
    this._loginPromise = null;
  }

  _refreshAccessTokenData() {
    return this._refreshToken.read().then(refreshToken => {
      if (refreshToken) {
        this._loginPromise =
          this._loginPromise ||
          authJwt.create({
            refreshToken
          });
        return this._loginPromise.then(response => {
          setJwtAuth(response.accessToken);
          this._loginPromise = null;
        });
      }
    });
  }

  _doLogin(dataSources, retry) {
    const noAuthenticationTokenError = new Error("Invalid credentials");
    return Promise.all([this._refreshToken.read(), this._apiKey.read()])
      .then(tokens => {
        const refreshToken = tokens[0];
        const apiKey = tokens[1];
        if (refreshToken) {
          this._loginPromise =
            this._loginPromise ||
            authJwt.create({
              refreshToken
            });
          return this._loginPromise.then(response => {
            setJwtAuth(response.accessToken);
            return retry();
          });
        } else if (apiKey) {
          setApiKeyAuth(apiKey);
          return retry();
        }
        return Promise.reject(noAuthenticationTokenError);
      })
      .then(results => {
        this._loginPromise = null;
        return Promise.all([authSessionStatus.isLogedIn().update(true), acceptCookies()]).then(
          () => {
            return Promise.resolve(results);
          }
        );
      })
      .catch(error => {
        this._loginPromise = null;
        if (error === noAuthenticationTokenError || error.message === "Unauthorized") {
          return this.logout().then(() => Promise.reject(error));
        } else {
          return Promise.reject(error);
        }
      });
  }

  _configDataSources() {
    apis.config({
      authErrorHandler: this._doLogin
    });
  }

  logout() {
    return Promise.all([
      this._refreshToken.delete(),
      this._apiKey.delete(),
      this._remember.delete(),
      authSessionStatus.isLogedIn().update(false)
    ]).then(() => {
      const previousLocation =
        this._history.location.pathname !== this._loginRoute
          ? `?${queryString.stringify({
              redirect: this._history.location.pathname
            })}`
          : "";
      this._history.push(`${this._loginRoute}${previousLocation}`);
      removeAuth();
      apis.clean();
      return Promise.resolve();
    });
  }

  setup(history, loginRoute) {
    this._history = history;
    this._loginRoute = loginRoute;
    this._configDataSources();
    socket.addListener(
      [
        "controller:created",
        "controller:deleted",
        "controller:updated",
        "controllerToken:created",
        "controllerToken:deleted",
        "controllerToken:updated",
        "cloudUser:updated",
        "cloudUser:deleted"
      ],
      () => {
        this._refreshAccessTokenData();
      }
    );
  }
}

export const session = new Session();
