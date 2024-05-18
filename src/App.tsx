import React, { useContext } from "react";
import SideBar from "./components/SideBar";
import Dialog from "./components/Dialog";
import { ThemeContext } from "./ThemeProvider";
import "./ThemeStyles.scss";

function Main() {
  const { theme, toggleTheme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`flex relative h-screen app main-container ${
        theme.themeType === "light"
          ? "main-containerLight"
          : "main-containerDark"
      }`}>
      <div className="w-[25%]">
        <SideBar />
      </div>
      <div className="absolute top-0 left-[25%] bottom-0 right-0"></div>
      <div className="absolute top-0 left-[25%] bottom-0 right-0 flex justify-center">
        <Dialog />
      </div>
    </div>
  );
}

export default Main;
