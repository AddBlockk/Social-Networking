import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
function PersonalChats() {
  const { theme } = useContext<ThemeContext>(ThemeContext);

  return (
    <div>
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Ф Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[82%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Name Man
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            fsdlfldsfldfldlfldsfldslfldfldslfldslфффффффааааа
          </p>
        </div>
      </div>
    </div>
  );
}

export default PersonalChats;
