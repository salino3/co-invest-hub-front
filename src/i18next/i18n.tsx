import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Import the language detector
import { en as enMain } from "./main/en";
import { es as esMain } from "./main/es";
import { en as enWCAG } from "./wcag/en";
import { es as esWCAG } from "./wcag/es";

// Use the language detector
i18n
  .use(LanguageDetector) // Add the language detector
  .use(initReactI18next) // Use React i18next
  .init({
    resources: {
      en: {
        main: enMain,
        wcag: enWCAG,
      },
      es: {
        main: esMain,
        wcag: esWCAG,
      },
    },
    lng: localStorage.getItem("lng") || undefined, // use detector to decide the language (use localStorage value if available)
    fallbackLng: "en", // Default language if the user's language is not supported
    detection: {
      order: [
        "navigator",
        "localStorage",
        "cookie",
        "htmlTag",
        "path",
        "subdomain",
      ], // Order of language detection
      caches: ["localStorage", "cookie"], // Cache the detected language in localStorage or cookies
    },
    interpolation: {
      escapeValue: false, // No need for escaping, React handles this
    },
  });

export default i18n;
