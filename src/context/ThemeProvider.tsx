import React, { useEffect, useState } from "react";
import GlobalStyles from "../GlobalStyles";
import { DefaultTheme } from "styled-components";

export type Theme = DefaultTheme & { themeType: "light" | "dark" };

export type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
  isNightMode: boolean;
};

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const storedTheme = localStorage.getItem("theme");
  const initialThemeType = storedTheme ?? "light";
  const initialIsNightMode = initialThemeType === "dark";
  const [isNightMode, setIsNightMode] = useState<boolean>(initialIsNightMode);

  const [theme, setTheme] = useState<Theme>({
    themeType: "light",
    colors: {
      primary: "#333",
      background: "#FFF",
    },
  });

  const toggleTheme = () => {
    const newThemeType = theme.themeType === "light" ? "dark" : "light";
    setTheme((prevTheme) => ({
      ...prevTheme,
      themeType: newThemeType,
      colors:
        newThemeType === "light"
          ? { primary: "#333", background: "#FFF" }
          : { primary: "#000", background: "#333" },
    }));
    setIsNightMode(newThemeType === "dark");
    localStorage.setItem("theme", newThemeType);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme((prevTheme) => ({
        ...prevTheme,
        themeType: storedTheme as "light" | "dark",
        colors:
          storedTheme === "light"
            ? { primary: "#333", background: "#FFF" }
            : { primary: "#000", background: "#333" },
      }));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isNightMode }}>
      <GlobalStyles {...theme} />
      {children}
    </ThemeContext.Provider>
  );
};
