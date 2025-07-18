import { useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProvider } from "./store";
import { AppRoutes } from "./router";
import "./App.scss";

function App() {
  const theme = useProvider((state) => state.theme);
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";

    // Apply CSS variables based on the theme value
    root.style.setProperty("--global-01", isDark ? "#ffffff" : "#1b1b1b");
    root.style.setProperty("--global-02", isDark ? "#1b1b1b" : "#dedede");
    root.style.setProperty("--global-03", isDark ? "#f4a261" : "#e76f51");
    root.style.setProperty("--global-04", isDark ? "#f7f7f7" : "#1b1b1b");
    root.style.setProperty("--global-05", isDark ? "#d4af37" : "#d4af37");
    root.style.setProperty("--global-06", isDark ? "#1b1b1b" : "#e2e8f0");
    root.style.setProperty("--global-07", isDark ? "#f5f5f5" : "#1b1b1b");
    root.style.setProperty("--global-08", isDark ? "#4a5568" : "#f3f3f3");
    root.style.setProperty(
      "--color-01",
      isDark ? "rgba(113, 128, 150, 0.5)" : "rgba(74, 85, 104, 0.5)"
    );
    root.style.setProperty("--color-02", isDark ? "#1e40af" : "#3b82f6");

    root.style.setProperty(
      "--global-lines",
      isDark ? "rgb(178, 164, 164)" : "rgba(0, 0, 0, 0.1)"
    );
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language || "en";
  }, [i18n.language]);

  return <AppRoutes />;
}

export default App;
