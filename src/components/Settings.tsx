import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import IconButton from "@mui/material/IconButton";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "@mui/material";

const Settings = ({
  setIsSettingsOpen,
}: {
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme, isNightMode } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const handleBackClick = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div
      className={`px-[10px] h-screen ${
        theme.themeType === "light" ? "light" : "dark"
      }`}>
      <div className="py-[6px] flex gap-3 items-center">
        <IconButton onClick={handleBackClick}>
          <ArrowBackIos
            sx={{
              color: isNightMode ? "white" : "#707579",
            }}
          />
        </IconButton>
        <h3 className="text-[1.25rem] font-medium">Settings</h3>
      </div>
      <div className="flex justify-center flex-col items-center gap-6">
        <Avatar
          className="max-w-[300px] w-full min-w-[300px] h-[100%] max-h-[300px] min-h-[300px] flex justify-center"
          style={{ objectFit: "cover" }}
          src={currentUser?.photoURL || ""}
          alt={currentUser?.displayName || ""}
        />
        <h1 className="flex text-[20px] font-medium white-space-nowrap overflow-hidden text-ellipsis">
          {currentUser?.displayName}
        </h1>
      </div>
    </div>
  );
};

export default Settings;
