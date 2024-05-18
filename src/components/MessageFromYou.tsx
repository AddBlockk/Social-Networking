import React, { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import "../ThemeStyles.scss";
function MessageFromYou() {
  const { theme, toggleTheme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`inline-flex pt-[5px] pr-[8px] pb-[6px] pl-[20px] mr-[10px] rounded-[10px] z-10 text-white max-w-[50%] relative justify-end shadow-md ${
        theme.themeType === "light" ? "lightDialogFromYou" : "darkDialogFromYou"
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
        className={`w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-r-[10px] border-r-transparent absolute right-[-10px] bottom-0  ${
          theme.themeType === "light" ? "lightMarkFromYou" : "darkMarkFromYou"
        }`}></div>
    </div>
  );
}

export default MessageFromYou;
