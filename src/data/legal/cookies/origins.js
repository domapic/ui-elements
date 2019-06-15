import { LocalStorage } from "@xbyorange/mercury-browser-storage";

export const cookies = new LocalStorage("cookies-advice");

cookies.addCustomQuery({
  accepted: () => "accepted"
});
