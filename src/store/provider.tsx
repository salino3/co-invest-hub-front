import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { PropsCurrentUser, PropsProvider } from "./interface";

export const useProvider = create<PropsProvider>()(
  persist(
    immer((set, get) => ({
      currentUser: {},
      companies: [],
      theme: "dark",
      changeGlobalColors() {
        const root = document.documentElement;

        if (root.style.getPropertyValue("--global-01") === "#1b1b1b") {
          // #dark
          root.style.setProperty("--global-01", "#f5f5f5");
          root.style.setProperty("--global-02", "#1b1b1b");
          root.style.setProperty("--global-03", "#f4a261");
          root.style.setProperty("--global-04", "#1b1b1b");
          root.style.setProperty("--global-05", "#d4af37");
          root.style.setProperty("--global-06", "#1b1b1b");
          root.style.setProperty("--global-07", "#f5f5f5");
          root.style.setProperty("--global-08", "#4a5568");
          root.style.setProperty("--global-lines", "rgb(178, 164, 164)");
        } else {
          // #light
          root.style.setProperty("--global-01", "#1b1b1b"); // Primary text color (dark for readability)
          root.style.setProperty("--global-02", "#f5f5f5"); // Main background color (clean white)
          root.style.setProperty("--global-03", "#e76f51"); // Accent color (warm coral for highlights)
          root.style.setProperty("--global-04", "#f7f7f7"); // Secondary background (cards, containers)
          root.style.setProperty("--global-05", "#cfa93f"); // Gold tone for emphasis (buttons, icons)
          root.style.setProperty("--global-06", "#e2e8f0"); // Input fields background (light gray-blue)
          root.style.setProperty("--global-07", "#1b1b1b"); // Secondary text color (dark for contrast)
          root.style.setProperty("--global-08", "#718096"); // Muted text color (less important info)
          root.style.setProperty("--global-lines", "rgba(0, 0, 0, 0.1)"); // Subtle separator lines
        }
      },
      loginAccount: (user: PropsCurrentUser) => {
        set((state) => {
          state.currentUser = user;
        });
      },
      logoutAccount: () => {
        set((state) => {
          state.currentUser = {};
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
