import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

function EditableMessage() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const sendIconColor = inputValue.length > 0 ? "#8774e1" : "#a2acb4";
  return (
    <div className="absolute bottom-0 w-full justify-center flex mb-[30px] items-center gap-5">
      <input
        type="text"
        className="bg-[#212121] rounded-full py-[18px] w-full text-white placeholder-[#a2acb4] pl-[43px] focus:outline-none"
        placeholder="Message"
        value={inputValue}
        onChange={handleInputChange}
      />
      <IconButton aria-label="send">
        <SendIcon style={{ color: sendIconColor }} />
      </IconButton>
    </div>
  );
}

export default EditableMessage;
