import { jwtDecode } from "jwt-decode";
import { PropsCurrentUser } from "../store";
import { routesApp } from "../router";
import { TFunction } from "i18next";

export const useAppFunctions = () => {
  //
  function getEndTokenFromCookie() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(import.meta.env.VITE_APP_COOKIE_AUTH)) {
        const endToken = cookie.split("=")[0].split("_").pop();
        return endToken;
      }
    }
    return null;
  }

  //*
  const getAuthToken = (): PropsCurrentUser | null => {
    const cookies = document.cookie.split("; ");
    const authCookie = cookies.find((cookie) =>
      cookie.startsWith(import.meta.env.VITE_APP_COOKIE_AUTH)
    );

    if (!authCookie) return null;

    const authCookieSplitted = authCookie.split("=")[1];

    // Verifiying it is divided in 3 parts - header, payload and signature
    if (authCookieSplitted && authCookieSplitted.split(".").length === 3) {
      try {
        const decoded: any = jwtDecode(authCookieSplitted);

        return decoded || null;
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
      }
    } else {
      console.error("Invalid JWT format.");
      return null;
    }
  };

  //
  const closeSession = (): void => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const [key] = cookies[i].trim().split("=");
      if (key.startsWith(import.meta.env.VITE_APP_COOKIE_AUTH)) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        window.location.href = routesApp?.root;
        return;
      }
    }
  };

  //
  const getWordPrefix = (str: string, word: string = "@") => {
    if (str && typeof str === "string") {
      const atIndex = str.indexOf(word);
      if (atIndex === -1) return str;
      return str.substring(0, atIndex) + `${word}...`;
    } else {
      return "";
    }
  };

  //
  function capitalizeFirst(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex

  /*
  Explanation:
  1. Regular Expression (`emailRegex`):
     - `^[^\s@]+` → Ensures at least one character before "@" with no spaces.
     - `@[^\s@]+` → Requires "@" followed by at least one character.
     - `\.[^\s@]+$` → Ensures a dot "." followed by at least one character.
     - Example of valid emails: `user@example.com`, `test123@mail.co`
     - Example of invalid emails: `user@.com`, `@example.com`, `user@com`
*/

  //
  function downLoadImage(logo: string) {
    if (!logo) return;

    fetch(logo)
      .then((response) => response.blob()) // Convert the image to a Blob
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        // Get file extension from URL
        const extension = logo.split(".").pop()?.split("?")[0] || "png";
        const currentDate = new Date().getTime();

        const a = document.createElement("a");
        a.href = url;
        a.download = `company_logo_${currentDate}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Release the URL object
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading the image:", error));
  }

  //*
  // Function for convert Base64 to Blob
  const base64ToBlob = (base64Data: any) => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: "image/png" });
  };

  //
  function getLocalizedCalendarData(language: string) {
    const locale = language || "en";

    // Get names of months
    const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
    const months = Array.from({ length: 12 }, (_, i) =>
      monthFormatter.format(new Date(2025, i, 1))
    );

    // Get names of the days of the week
    const dayFormatter = new Intl.DateTimeFormat(locale, { weekday: "long" });
    const weeks = Array.from({ length: 7 }, (_, i) =>
      dayFormatter.format(new Date(2024, 0, i + 1))
    );

    // Get names of "day", "month" y "year"
    const displayNames = new Intl.DisplayNames(locale, {
      type: "dateTimeField",
    });

    const calendarNames = {
      day: displayNames.of("day"),
      month: displayNames.of("month"),
      year: displayNames.of("year"),
    };

    return { months, weeks, calendarNames };
  }

  //
  function capitalizeFirstLetter(val: string) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  //
  function getAvailableDays(year: string, month: string) {
    // Convert strings to numbers
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);

    if (!y || !m) {
      if (m === 2) {
        return Array.from({ length: 29 }, (_, i) => i + 1);
      }
      return Array.from({ length: 31 }, (_, i) => i + 1);
    }

    // new Date(year, month, 0) return the last day of indicated month (remember that parameter 'month' es 1-indexed)
    const maxDays = new Date(y, m, 0).getDate();
    return Array.from({ length: maxDays }, (_, i) => i + 1);
  }

  //
  const scrollToErrorInput = (
    setTabs: React.Dispatch<React.SetStateAction<number>>,
    tab: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      setTabs(tab);
      resolve();
    });
  };

  //
  function checkFormRequired(
    formData: any,
    setFormDataError: any,
    t: TFunction<"main", undefined>,
    listNoRequired: string[],
    setTabs?: React.Dispatch<React.SetStateAction<number>>
  ): boolean {
    let hasError = false;
    let inputWithError: HTMLElement | null = null;
    let input: string | null = null;
    for (let key in formData) {
      if (
        !listNoRequired.includes(key) &&
        (!formData[key] ||
          (typeof formData[key] === "string" && !formData[key].trim()))
      ) {
        setFormDataError((prev: any) => ({
          ...prev,
          [key]: t("required"),
        }));

        if (!inputWithError) {
          input = key + "ID";
          inputWithError = document.getElementById(key + "ID");
        }

        hasError = true;
      }
    }
    if (setTabs) {
      const pages: Record<number, string[]> = {
        0: ["roleID", "nameID"],
        1: ["sectorID"],
        2: ["otherID"],
      };

      const choosingTab: string | undefined = Object.entries(pages).find(
        ([_, ids]: [string, string[]]) => ids.includes(input || "")
      )?.[0];

      const tabIndex: number =
        choosingTab !== undefined ? parseInt(choosingTab) : 0;

      scrollToErrorInput(setTabs, tabIndex).then(() => {
        checkFormRequired(formData, setFormDataError, t, [
          "contacts",
          "sector",
        ]);
      });
    } else {
      if (inputWithError) {
        inputWithError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        inputWithError.focus();
      }
    }
    return hasError;
  }

  return {
    getEndTokenFromCookie,
    getAuthToken,
    closeSession,
    //
    getWordPrefix,
    capitalizeFirst,
    downLoadImage,
    //
    base64ToBlob,
    getLocalizedCalendarData,
    capitalizeFirstLetter,
    getAvailableDays,
    //
    checkFormRequired,
    // checkDataFormCompany
  };
};
