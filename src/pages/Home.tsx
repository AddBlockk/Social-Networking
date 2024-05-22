import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import SideBar from "../components/SideBar";
import Dialog from "../components/Dialog";
function Home() {
  const { theme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`flex relative h-screen app main-container ${
        theme.themeType === "light"
          ? "main-containerLight"
          : "main-containerDark"
      }`}>
      <div className="max-w-[400px] min-w-[400px] relative">
        <SideBar />
      </div>
      <div className="flex-1 flex justify-center">
        <Dialog />
      </div>
    </div>
  );
}
export default Home;
