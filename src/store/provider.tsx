import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { PropsCurrentUser, PropsProvider } from "./interface";

export const useProvider = create<PropsProvider>()(
  persist(
    immer((set, get) => ({
      currentUser: null,
      companies: [],
      theme: "dark",
      changeGlobalColors() {
        const root = document.documentElement;
        const isDark = get().theme === "dark";

        root.style.setProperty("--global-01", isDark ? "#1b1b1b" : "#ffffff");
        root.style.setProperty("--global-02", isDark ? "#dedede" : "#1b1b1b");
        root.style.setProperty("--global-03", isDark ? "#e76f51" : "#f4a261");
        root.style.setProperty("--global-04", isDark ? "#f7f7f7" : "#1b1b1b");
        root.style.setProperty("--global-05", isDark ? "#d4af37" : "#d4af37");
        root.style.setProperty("--global-06", isDark ? "#e2e8f0" : "#1b1b1b");
        root.style.setProperty("--global-07", isDark ? "#1b1b1b" : "#f5f5f5");
        root.style.setProperty("--global-08", isDark ? "#f3f3f3" : "#4a5568");
        root.style.setProperty(
          "--color-01",
          isDark ? "rgba(74, 85, 104, 0.5)" : "rgba(113, 128, 150, 0.5)"
        );
        root.style.setProperty(
          "--global-lines",
          isDark ? "rgba(0, 0, 0, 0.1)" : "rgb(178, 164, 164)"
        );
        set((state) => {
          state.theme = isDark ? "light" : "dark";
        });
      },

      loginAccount: (user: PropsCurrentUser) => {
        set((state) => {
          state.currentUser = user;
        });
      },
      logoutAccount: () => {
        set((state) => {
          state.currentUser = null;
        });
      },
    })),
    {
      name: "companies-storage",
      //* Storage in localStorage for default, also without include the parameter.
      storage: createJSONStorage(() => sessionStorage),
      //* For default 'persist' saves all object and arrays
      //   partialize: (state) => ({ count: state.product }),
    }
  )
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
