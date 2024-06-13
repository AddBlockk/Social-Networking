import { Avatar } from "@mui/material";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

interface UserInfo {
  displayName: string;
  photoURL: string;
  uid: string;
}

interface Chat {
  id: string; // уникальный идентификатор чата
  users: string[]; // массив из идентификаторов пользователей, участвующих в чате
  lastMessage: {
    text: string; // текст последнего сообщения в чате
    senderId: string; // идентификатор отправителя последнего сообщения
    date: Timestamp;
  };
  displayName: string;
  userInfo: UserInfo;
  date: Timestamp;
  photoURL: string;
}

function AllChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const { theme } = useContext<ThemeContext>(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const userDocRef = currentUser?.uid
        ? doc(db, "userChats", currentUser?.uid)
        : null;
      if (userDocRef) {
        const unsub = onSnapshot(userDocRef, (doc) => {
          const data = doc.data();
          if (data !== undefined) {
            const chats = Object.entries(data).map(([id, chat]) => ({
              id,
              ...chat,
            }));
            setChats(chats);
          }
        });
        return () => {
          unsub();
        };
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u: Chat) => {
    if (typeof dispatch === "function" && u.userInfo.uid) {
      dispatch({ type: "CHANGE_USER", payload: { uid: u.userInfo.uid } });
    }
  };

  if (!theme) {
    return null;
  }

  return (
    <div>
      {Object.entries(chats)
        .sort(
          (a, b) =>
            (b[1].lastMessage?.date?.toMillis() || 0) -
            (a[1].lastMessage?.date?.toMillis() || 0)
        )
        .map((chat) => (
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1])}
            className={`cursor-pointer px-[5px] py-[5px] rounded-lg ${
              theme.themeType === "light"
                ? "hover:bg-[#f4f4f5]"
                : "hover:bg-[#2c2c2c]"
            }`}>
            <div className="flex items-center gap-5 relative max-w-[85%]">
              <Avatar
                alt={chat[1].userInfo.displayName}
                src={chat[1].userInfo.photoURL}
              />
              <div className="w-full">
                <p
                  className={`text-white truncate text-ellipsis ${
                    theme.themeType === "light" ? "textLight" : "textDark"
                  }`}>
                  {chat[1].userInfo.displayName
                    ? chat[1].userInfo.displayName
                    : "Нету такого пользователя"}
                </p>
                <div className="flex justify-between text-[#aaaaaa]">
                  <p className="truncate text-ellipsis max-w-[80%]">
                    {chat[1].lastMessage?.text}
                  </p>
                  <p>{chat[1].lastMessage?.date?.toMillis()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AllChats;
