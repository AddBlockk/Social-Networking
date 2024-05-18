import React, { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import { DefaultTheme } from "styled-components";

type Theme = DefaultTheme & { themeType: "light" | "dark" };

export type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>({
    themeType: "light",
    colors: {
      primary: "#333",
      background: "#FFF",
    },
  });

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.themeType === "light"
        ? {
            themeType: "dark",
            colors: {
              primary: "#000",
              background: "#333",
            },
          }
        : {
            themeType: "light",
            colors: {
              primary: "#333",
              background: "#FFF",
            },
          }
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GlobalStyles {...theme} />
      {children}
    </ThemeContext.Provider>
  );
};
