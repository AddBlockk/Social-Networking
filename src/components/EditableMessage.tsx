import React, { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import "../ThemeStyles.scss";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { ThemeContext } from "../context/ThemeProvider";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function EditableMessage() {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // const [inputValue, setInputValue] = useState("");
  const { theme } = useContext<ThemeContext>(ThemeContext);

  const sendIconColor =
    text.length > 0
      ? theme.themeType === "dark"
        ? "#8774e1"
        : "#3390ec"
      : "#a2acb4";
  const disabled = text.length <= 0 ? "not-allowed" : "";

  const handleSend = async () => {
    if (!text) {
      console.log("текст не набран");
      return;
    }

    if (currentUser) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    } else {
      console.log("ошибка допуска");
    }

    if (currentUser) {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
    }
  };

  return (
    <div className="mt-[10px] px-[40px] xl:px-[80px] bottom-0 w-full justify-center flex mb-[30px] items-center gap-5">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        className={` rounded-full py-[18px] w-full text-white placeholder-[#a2acb4] pl-[43px] focus:outline-none ${
          theme.themeType === "light" ? "light" : "dark"
        }`}
        placeholder="Message"
        value={text}
      />
      <button
        onClick={handleSend}
        className={`bg-black rounded-full ${
          theme.themeType === "light" ? "light" : "dark"
        }`}>
        <IconButton
          aria-label="send"
          style={{ cursor: disabled }}
          disabled={!text}>
          <SendIcon
            style={{
              color: sendIconColor,
              margin: "8px",
            }}
          />
        </IconButton>
      </button>
    </div>
  );
}

export default EditableMessage;
