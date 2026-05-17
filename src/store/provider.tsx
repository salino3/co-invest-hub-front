import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";
import Cookies from "js-cookie";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  MyCompany,
  PropsCompany,
  PropsCurrentUserLogin,
  PropsProvider,
} from "./interface";

export const useProvider = create<PropsProvider>()(
  persist(
    immer((set, get) => ({
      currentUser: null,
      companies: [],
      myCompanies: [],
      theme: "dark",
      setCompanies: (companies: PropsCompany[]) => {
        set((state) => {
          state.companies = companies;
        });
      },
      setMyCompanies: (companies: MyCompany[]) => {
        set((state) => {
          state.myCompanies = companies;
        });
      },
      changeGlobalColors() {
        const root = document.documentElement;
        const isDark = get().theme === "dark";

        root.style.setProperty("--global-01", isDark ? "#1b1b1b" : "#ffffff");
        root.style.setProperty("--global-02", isDark ? "#dedede" : "#1b1b1b");
        root.style.setProperty("--global-03", isDark ? "#e76f51" : "#f4a261");
        root.style.setProperty("--global-04", isDark ? "#1b1b1b" : "#f7f7f7");
        root.style.setProperty("--global-05", isDark ? "#d4af37" : "#d4af37");
        root.style.setProperty("--global-06", isDark ? "#e2e8f0" : "#1b1b1b");
        root.style.setProperty("--global-07", isDark ? "#1b1b1b" : "#f5f5f5");
        root.style.setProperty("--global-08", isDark ? "#f3f3f3" : "#4a5568");
        root.style.setProperty(
          "--color-01",
          isDark ? "rgba(74, 85, 104, 0.5)" : "rgba(113, 128, 150, 0.5)",
        );
        root.style.setProperty("--color-02", isDark ? "#1e40af" : "#3b82f6");
        root.style.setProperty(
          "--global-lines",
          isDark ? "rgba(0, 0, 0, 0.1)" : "rgb(178, 164, 164)",
        );
        set((state) => {
          state.theme = isDark ? "light" : "dark";
        });
      },

      loginAccount: (user: PropsCurrentUserLogin) => {
        const { token, ...rest } = user;
        console.log("clog1", rest);
        if (token) {
          const isProduction = import.meta.env.VITE_APP_BASE === "production";
          let cookieName = import.meta.env.VITE_APP_COOKIE_AUTH;

          if (!isProduction) {
            // Try to reuse existing cookie suffix if present to avoid multiple cookies
            const existingCookie = document.cookie
              .split(";")
              .map((c) => c.trim())
              .find((c) => c.startsWith(import.meta.env.VITE_APP_COOKIE_AUTH));
            console.log("clog3", existingCookie);
            if (existingCookie) {
              cookieName = existingCookie.split("=")[0];
            } else {
              const suffix = Math.floor(1000 + Math.random() * 9000).toString();
              cookieName += suffix;
              console.log("clog4", suffix);
            }
          }

          Cookies.set(cookieName, token, {
            expires: new Date(Date.now() + 3600 * 1000),
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
          });
        }

        set((state) => {
          state.currentUser = { ...rest, token };
        });
      },
      logoutAccount: () => {
        set((state) => {
          state.currentUser = null;
          state.myCompanies = [];
          state.companies = [];
        });
      },
    })),
    {
      name: "companies-storage",
      //* Storage in localStorage for default, also without include the parameter.
      storage: createJSONStorage(() => sessionStorage),
      //* For default 'persist' saves all object and arrays
      partialize: (state) => ({
        myCompanies: state.myCompanies,
        currentUser: state.currentUser,
      }),
    },
  ),
);

// Selector for avoid rerender
export function useProviderSelector<T extends keyof PropsProvider>(
  ...keys: T[]
):
  | { [K in keyof PropsProvider]: PropsProvider[K] }
  | { [K in T]?: PropsProvider[K] } {
  if (keys.length === 0) {
    return useProvider(useShallow((state) => state));
  }

  const selectors: { [K in T]?: PropsProvider[K] } = {};

  keys.forEach((key) => {
    selectors[key] = useProvider(useShallow((state) => state[key]));
  });

  return selectors;
}
