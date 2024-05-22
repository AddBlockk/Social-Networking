import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
function MessageFromYou() {
  const { theme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`inline-flex pt-[5px] pr-[20px] pb-[6px] pl-[20px] mr-[10px] rounded-b-lg rounded-tl-lg z-10 text-white max-w-[50%] relative justify-end shadow-md ${
        theme.themeType === "light"
          ? "light dialogFromYou"
          : "dark dialogFromYou"
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
    </div>
  );
}

export default MessageFromYou;
