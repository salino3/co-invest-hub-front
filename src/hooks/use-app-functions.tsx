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
    localStorage.removeItem("searchData");

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

  // Comment old version 'downLoadImage'
  // function downLoadImage(logo: string) {
  //   if (!logo) return;

  //   fetch(logo)
  //     .then((response) => response.blob()) // Convert the image to a Blob
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);

  //       // Get file extension from URL
  //       // TODO: accept more types of photos
  //       const extension = logo.split(".").pop()?.split("?")[0] || "png";
  //       const currentDate = new Date().getTime();

  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = `company_logo_${currentDate}.${extension}`;
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);

  //       // Release the URL object
  //       window.URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => console.error("Error downloading the image:", error));
  // }

  // TODO: check and test well new version, and delete old version
  //* new version 'downLoadImage' 16-12-2025
  function downLoadImage(logo: string) {
    if (!logo) return;

    let fileExtension = "png"; // Default extension

    fetch(logo)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 1. Get the MIME type from the response headers (e.g., 'image/jpeg')
        const contentType = response.headers.get("Content-Type");

        if (contentType) {
          // Extract the part after the slash (e.g., 'jpeg' from 'image/jpeg')
          const typePart = contentType.split("/").pop();
          if (typePart && typePart !== "octet-stream") {
            // 'octet-stream' is generic
            fileExtension = typePart.replace("svg+xml", "svg"); // Handle special cases like svg+xml
          }
        } else {
          // Fallback: If Content-Type is missing, try to get the extension from the URL string
          fileExtension = logo.split(".").pop()?.split("?")[0] || "png";
        }

        return response.blob();
      })
      .then((blob) => {
        // Create a temporary URL for the Blob object
        const url = window.URL.createObjectURL(blob);
        const currentDate = new Date().getTime();

        // Create a temporary anchor element for triggering download
        const a = document.createElement("a");
        a.href = url;

        // Use the determined fileExtension
        a.download = `company_logo_${currentDate}.${fileExtension}`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up by revoking the temporary URL object
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
  const handleNumericPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Prevent the default paste action immediately to control the input flow
    e.preventDefault();

    const input = e.currentTarget;

    // 1. Get the pasted text from the clipboard data
    const paste = e.clipboardData.getData("text");

    // 2. Clean the pasted text: only allow digits (0-9) and the decimal point (.)
    let cleanedPaste = paste.replace(/[^\d.]/g, "");

    // 3. Handle multiple decimal points in the pasted content itself (e.g., "1.2.3" -> "1.23")
    if (cleanedPaste.includes(".")) {
      const parts = cleanedPaste.split(".");
      // Rebuild the string using the first part, one dot, and the rest of the digits
      cleanedPaste = parts[0] + "." + parts.slice(1).join("");
    }

    // 4. Determine cursor/selection position to calculate the final value
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    // 5. Calculate the combined final value (current value + cleaned paste)
    const currentValue = input.value;
    const finalValue =
      currentValue.substring(0, start) +
      cleanedPaste +
      currentValue.substring(end);

    // 6. Check: Block the paste if the combined value results in more than one decimal point
    if (finalValue.split(".").length > 2) {
      return;
    }

    // 7. Insert the cleaned text using the modern, non-deprecated setRangeText method.
    // This updates the input value property.
    input.setRangeText(cleanedPaste, start, end, "end");

    // 8. Manually dispatch the 'input' event to notify React and trigger the 'onChange' prop.
    // This is crucial because setRangeText does not automatically fire React's change event.
    input.dispatchEvent(new Event("input", { bubbles: true }));
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
        console.log("Field with error:", key, "Value:", formData[key]);

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
        0: ["roleID", "nameID", "description", "sector", "location"],
        1: ["investment_minID", "investment_maxID"],
        2: ["otherID"],
      };

      const choosingTab: string | undefined = Object.entries(pages).find(
        ([_, ids]: [string, string[]]) => ids.includes(input || "")
      )?.[0];
      console.log(
        "choosingTab",
        Object.entries(pages).find(([_, ids]: [string, string[]]) =>
          ids.includes(input || "")
        )
      );
      const tabIndex: number =
        choosingTab !== undefined ? parseInt(choosingTab) : 0;

      scrollToErrorInput(setTabs, tabIndex).then(() => {
        checkFormRequired(formData, setFormDataError, t, listNoRequired);
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

  //
  const convertBlobToBase64 = async (blobUrl: string): Promise<string> => {
    // Check if the URL is a blob URL generated by the browser
    if (!blobUrl.startsWith("blob:")) {
      // Not a blob URL, return it as is. It might be a server URL or already Base64.
      return blobUrl;
    }

    try {
      // 1. Fetch the blob data using the temporary URL
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      // 2. Read the blob content and convert it to Data URL (Base64)
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          // Resolve with the Data URL
          resolve(reader.result as string);
        };

        // Set up reader error handler
        reader.onerror = reject;

        // Start reading the blob as a Data URL
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting blob to Base64:", error);
      // If conversion fails, return the original URL to prevent breaking the service call.
      return blobUrl;
    }
  };

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
    handleNumericPaste,
    checkFormRequired,
    // checkDataFormCompany
    convertBlobToBase64,
  };
};
