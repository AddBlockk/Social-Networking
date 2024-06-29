import React, { memo } from "react";
import { Avatar } from "@mui/material";
import { Timestamp } from "firebase/firestore";

interface UserInfo {
  displayName: string;
  photoURL: string;
  uid: string;
}

interface Chat {
  id: string;
  users: string[];
  lastMessage: {
    text: string;
    senderId: string;
    date: Timestamp;
  };
  displayName: string;
  userInfo: UserInfo;
  date: Timestamp;
  photoURL: string;
}

interface ChatItemProps {
  chat: Chat;
  handleSelect: (u: Chat) => void;
  selectedUserId: string | null;
  theme: { themeType: string };
  handleSendMessage: (chatId: string, message: string) => Promise<void>;
}

const ChatItem: React.FC<ChatItemProps> = memo(
  ({ chat, handleSelect, selectedUserId, theme, handleSendMessage }) => {
    return (
      <div
        onClick={() => handleSelect(chat)}
        className={`cursor-pointer px-[5px] py-[5px] my-[5px] rounded-lg ${
          chat.userInfo.uid === selectedUserId
            ? theme.themeType === "light"
              ? "bg-[#3390ec]"
              : "bg-[#766ac8]"
            : theme.themeType === "light"
            ? "hover:bg-[#f4f4f5]"
            : "hover:bg-[#2c2c2c]"
        }`}>
        <div className="flex items-center gap-5 relative">
          <Avatar
            alt={chat.userInfo.displayName}
            src={chat.userInfo.photoURL}
          />
          <div className="w-full">
            <p
              className={`truncate text-ellipsis max-w-[240px] font-medium ${
                chat.userInfo.uid === selectedUserId
                  ? "text-white"
                  : theme.themeType === "light"
                  ? "textLight"
                  : "textDark"
              }`}>
              {chat.userInfo.displayName
                ? chat.userInfo.displayName
                : "Нету такого пользователя"}
            </p>
            <div className="flex justify-between text-[#aaaaaa]">
              <p
                className={`truncate text-ellipsis max-w-[240px] ${
                  chat.userInfo.uid === selectedUserId
                    ? "text-white"
                    : "text-[#aaaaaa]"
                }`}>
                {chat.lastMessage?.text}
              </p>
              <p
                className={`mr-[10px] ${
                  chat.userInfo.uid === selectedUserId
                    ? "text-white"
                    : "text-[#aaaaaa]"
                }`}>
                {chat.date
                  ? new Date(chat.date.toMillis()).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default ChatItem;
