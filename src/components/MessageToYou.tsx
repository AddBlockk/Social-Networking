import React, { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import "../ThemeStyles.scss";
function MessageToYou() {
  const { theme, toggleTheme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`inline-flex pt-[5px] pr-[8px] pb-[6px] pl-[20px] ml-[10px] rounded-[10px] z-10 text-white max-w-[50%] relative shadow-md   ${
        theme.themeType === "light" ? "lightDialogToYou" : "darkDialogToYou"
      }`}>
      <p className="break-all">
        sdfdfdfdsfdsfdfdfdsfdfdf flsdlfdslfldsfldslf sdfdfdfdsfdsfdfdfdsfdfdf
        flsdlfdslfldsfldslf fdfdfdfdsfds sdfdfdfdsfdsfdfdfdsfdfdf
        flsdlfdslfldsfldslf fdfdfdfdsfds sdfdfdfdsfdsfdfdfdsfdfdf
        flsdlfdslfldsfldslf fdfdfdfdsfds sdfdfdfdsfdsfdfdfdsfdfdf
        flsdlfdslfldsfldslf fdfdfdfdsfds sdfdfdfdsfdsfdfdfdsfdfdf
        flsdlfdslfldsfldslf fdfdfdfdsfds sdfdfdfdsfdsfdfdfdsfdfdf
        flsdlfdslfldsfldslf fdfdfdfdsfds sdfdfdfdsfdsfdfdfdsfdfdf
        flsdlfdslfldsfldslf fdfdfdfdsfds sdfdfdfdsfdsfdfdfdsfdfdf
        flsdlfdslfldsfldslf fdfdfdfdsfds fdfdfdfdsfds
      </p>
      <div
        className={`w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-[#444444] border-r-[10px] border-r-transparent absolute left-[-10px] bottom-0 ${
          theme.themeType === "light" ? "lightMarkToYou" : "darkMarkToYou"
        }`}></div>
    </div>
  );
}

export default MessageToYou;
