import React, { useContext, useEffect, useState, memo } from "react";
import { Avatar } from "@mui/material";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { ThemeContext, Theme } from "../context/ThemeProvider";
import ChatItem from "./ChatItem";

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

function AllChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const { theme } = useContext<ThemeContext>(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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
      setSelectedUserId(u.userInfo.uid);
    }
  };

  if (!theme) {
    return null;
  }

  return (
    <div>
      {chats.length > 0 &&
        chats
          .filter((chat) => chat.date !== null)
          .sort((a, b) => b.date.toMillis() - a.date.toMillis())
          .map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              handleSelect={handleSelect}
              selectedUserId={selectedUserId}
              theme={theme}
            />
          ))}
    </div>
  );
}

export default AllChats;
