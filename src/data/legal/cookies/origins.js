import { LocalStorage } from "@data-provider/browser-storage";

export const cookies = new LocalStorage("cookies-advice");

cookies.onCleanAny(cleanDetails => {
  if (cleanDetails.source._queryId) {
    cookies.clean();
  }
});

cookies.addCustomQuery({
  accepted: () => "accepted"
});
