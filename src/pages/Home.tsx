import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import SideBar from "../components/SideBar";
import Dialog from "../components/Dialog";
import Settings from "../components/Settings";

function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { theme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`flex relative h-screen app main-container ${
        theme.themeType === "light"
          ? "main-containerLight"
          : "main-containerDark"
      }`}>
      <div className="max-w-[400px] min-w-[400px] relative">
        {isSettingsOpen ? (
          <Settings setIsSettingsOpen={setIsSettingsOpen} />
        ) : (
          <SideBar setIsSettingsOpen={setIsSettingsOpen} />
        )}
      </div>
      <div className="block w-full justify-center">
        <Dialog />
      </div>
    </div>
  );
}
export default Home;
