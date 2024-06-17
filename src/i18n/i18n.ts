import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import { storage, StorageKeys } from "utils";
import { en } from "./EN";
import { vi } from "./VI";
import { SupportedLngs } from "./i18n.types";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async (callback) => {
    const result = storage.getString(StorageKeys.lng) ?? SupportedLngs.vi;
    callback(result);
    return result;
  },
  cacheUserLanguage: (lng) => {
    storage.set(StorageKeys.lng, lng);
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: SupportedLngs.en,
      compatibilityJSON: "v3",
      resources: {
        [SupportedLngs.vi]: vi,
        [SupportedLngs.en]: en,
      },

      // have a common namespace used around the full app
      ns: ["common"],
      defaultNS: "common",
      debug: true,
      cache: { enabled: true },
    });
}

export default i18n;
