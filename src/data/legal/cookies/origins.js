import { LocalStorage } from "@xbyorange/mercury-browser-storage";

export const cookies = new LocalStorage("cookies-advice");

cookies.onCleanAny(cleanDetails => {
  if (cleanDetails.source._queryId) {
    cookies.clean();
  }
});

cookies.addCustomQuery({
  accepted: () => "accepted"
});
