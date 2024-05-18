import React, { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import "../ThemeStyles.scss";
import { ThemeContext } from "../ThemeProvider";

function EditableMessage() {
  const [inputValue, setInputValue] = useState("");
  const { theme, toggleTheme } = useContext<ThemeContext>(ThemeContext);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };
  const sendIconColor =
    inputValue.length > 0
      ? theme.themeType === "dark"
        ? "#8774e1"
        : "#3390ec"
      : "#a2acb4";
  const disabled = inputValue.length <= 0 ? "not-allowed" : "";
  return (
    <div className="absolute bottom-0 w-full justify-center flex mb-[30px] items-center gap-5">
      <input
        type="text"
        className={` rounded-full py-[18px] w-full text-white placeholder-[#a2acb4] pl-[43px] focus:outline-none ${
          theme.themeType === "light" ? "light" : "dark"
        }`}
        placeholder="Message"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div
        className={`bg-black rounded-full ${
          theme.themeType === "light" ? "light" : "dark"
        }`}>
        <IconButton aria-label="send" style={{ cursor: disabled }}>
          <SendIcon
            style={{
              color: sendIconColor,
              margin: "8px",
            }}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default EditableMessage;
