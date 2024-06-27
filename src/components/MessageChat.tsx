import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import { MessageType } from "../components/ContainerDialog";
import { AuthContext } from "../context/AuthContext";

interface MessageChatProps {
  message: MessageType;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

function MessageChat({ message }: MessageChatProps) {
  const ref = useRef<HTMLElement>(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (message.text !== "") {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const isCurrentUser = currentUser?.uid === message.senderId;
  const { theme } = useContext<ThemeContext>(ThemeContext);

  const dialogFromYouStyle = {
    backgroundColor: theme.themeType === "light" ? "#eeffde" : "#766ac8",
  };

  const dialogToYouStyle = {
    backgroundColor: theme.themeType === "light" ? "#fff" : "#2c2c2c",
  };

  return (
    <div
      className={`${isCurrentUser ? "dialogFromYou" : "dialogToYou"} ${
        theme.themeType === "light"
          ? "light dialogFromYou"
          : "dark dialogFromYou"
      }`}
      style={isCurrentUser ? dialogFromYouStyle : dialogToYouStyle}>
      <p className="break-all">{message.text}</p>
    </div>
  );
}

export default MessageChat;
