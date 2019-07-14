import { LocalStorage, SessionStorage } from "@xbyorange/mercury-browser-storage";
import { Memory } from "@xbyorange/mercury-memory";
import { Api } from "@xbyorange/mercury-api";

// AUTHENTICATION SESSION

export const authSessionDetails = new LocalStorage("authentication-details");

authSessionDetails.addCustomQuery({
  rememberMe: () => "remember-me"
});

export const authSessionRemember = new LocalStorage("authentication");
export const authSessionTemporal = new SessionStorage("authentication");

export const authSessionStatus = new Memory({
  isLogedIn: false,
  isLoginIn: true
});

authSessionStatus.addCustomQuery({
  isLogedIn: () => "isLogedIn"
});

authSessionStatus.addCustomQuery({
  isLoginIn: () => "isLoginIn"
});

// AUTHENTICATION API

export const authJwt = new Api("/auth/jwt");

export const authGoogle = new Api("/auth/google");
