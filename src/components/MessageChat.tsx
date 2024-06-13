import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import { MessageType } from "../components/ContainerDialog";

interface MessageChatProps {
  message: MessageType;
}

function MessageChat({ message }: MessageChatProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (message.text !== "") {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const { theme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`inline-flex pt-[5px] pr-[20px] pb-[6px] pl-[20px] mr-[10px] rounded-b-lg rounded-tl-lg z-10 text-white max-w-[50%] relative justify-end shadow-md ${
        theme.themeType === "light"
          ? "light dialogFromYou"
          : "dark dialogFromYou"
      }`}>
      <p className="break-all">{message.text}</p>
    </div>
  );
}

export default MessageChat;
