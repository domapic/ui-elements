import { debounce, isArray } from "lodash";

import { authSession } from "data/security";

const DEBOUNCE_TIME = 500;
const AUTH_METHODS = {
  JWT: "jwt",
  API_KEY: "apiKey",
  ANONYMOUS: "anonymous"
};

class Socket {
  constructor() {
    this._socket = null;
    this._listeners = [];
    this._refreshToken = authSession.refreshToken();
    this._apiKey = authSession.apiKey();
    this._doJwtLogin = debounce(this._doLogin.bind(this), DEBOUNCE_TIME);
    this._doLogout = debounce(this._doLogout.bind(this), DEBOUNCE_TIME);
    this._getCurrentAuth = debounce(this._getCurrentAuth.bind(this), DEBOUNCE_TIME);

    this._currentToken = null;
    this._currentAuthMethod = null;
    this._currentController = null;
  }

  _handleDataSources() {
    this._listeners.forEach(listener => {
      this._socket.on(listener.eventName, listener.callback);
    });
  }

  _doLogin(refreshToken) {
    if (this._currentToken !== refreshToken) {
      if (!this.socket) {
        if (refreshToken !== AUTH_METHODS.ANONYMOUS || !this._options.avoidAnonymous) {
          console.log("Initializing socket");
          this._initSocket();
        }
      }
      if (this._socket && this._socket.connected) {
        this._socket.close();
      }
      this._currentToken = refreshToken;
      if (this._socket) {
        console.log("Connecting socket");
        this._socket.connect();
      }
    }
  }

  _doLogout() {
    this._currentToken = null;
    this._currentAuthMethod = null;
    this._socket.close();
  }

  _getCurrentAuth() {
    return Promise.all([this._refreshToken.read(), this._apiKey.read()]).then(results => {
      if (results[0]) {
        this._currentAuthMethod = AUTH_METHODS.JWT;
        return this._doLogin(results[0]);
      }
      if (results[1]) {
        this._currentAuthMethod = AUTH_METHODS.API_KEY;
        return this._doLogin(results[1]);
      }
      this._currentAuthMethod = AUTH_METHODS.ANONYMOUS;
      return this._doLogin(AUTH_METHODS.ANONYMOUS);
    });
  }

  _emitCurrentController() {
    if (this._socket && this._socket.connected) {
      this._socket.emit("changeController", this._currentController);
    }
  }

  _initSocket() {
    this._socket = window && window.io && window.io(this._url);
    if (this._socket) {
      this._socket.on("authenticated", () => {
        console.log("Socket authenticated");
        if (this._currentController) {
          this._emitCurrentController();
        }
      });
      this._socket.on("unauthorized", error => {
        console.log("Error in socket authentication:", error.message);
        this._doLogout();
      });
      this._socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
      this._socket.on("error", error => {
        console.log("Socket error");
        console.log(error);
      });
      this._socket.on("connect", () => {
        console.log("Socket connected");
        if (this._currentToken) {
          console.log("Emitting authentication");
          this._socket.emit("authentication", {
            [this._currentAuthMethod]: this._currentToken
          });
        }
      });

      this._handleDataSources();
    } else {
      console.log("Sockets are not available");
    }
  }

  _addAuthListeners() {
    this._refreshToken.onChange(this._getCurrentAuth);
    this._apiKey.onChange(this._getCurrentAuth);
  }

  // Only for testing purposes
  _trigger(eventName, eventData) {
    this._listeners
      .filter(listener => listener.eventName === eventName)
      .forEach(listener => {
        listener.callback(eventData);
      });
  }

  // DataSources will add their listeners using this method
  addListener(eventName, callback) {
    const eventNames = isArray(eventName) ? eventName : [eventName];
    eventNames.forEach(eventName => {
      this._listeners.push({
        eventName,
        callback
      });
    });
  }

  setup(url, version, options = {}) {
    this._options = options;
    this._url = url;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = () => {
      this._addAuthListeners();
      this._getCurrentAuth();
    };
    script.src = `${url}/socket.io/socket.io.js?v=${version}`;
    document.head.appendChild(script);
  }

  set currentController(controllerId) {
    if (this._currentController !== controllerId) {
      this._currentController = controllerId;
      this._emitCurrentController();
    }
  }

  get currentController() {
    return this._currentController;
  }
}

export const socket = new Socket();
