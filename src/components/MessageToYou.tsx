import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
function MessageToYou() {
  const { theme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`inline-flex pt-[5px] pr-[20px] pb-[6px] pl-[20px] ml-[10px] rounded-b-lg rounded-tr-lg z-10 text-white max-w-[50%] relative shadow-md   ${
        theme.themeType === "light" ? "light dialogToYou" : "dark dialogToYou"
      }`}>
      <p className="break-all">
        sdfdfdfdsfdsfdfdfdsfdfdf flsdlfdslfldsfldslf sdfdfdfdsfdsfdfdfdsfdfdf
      </p>
    </div>
  );
}

export default MessageToYou;
