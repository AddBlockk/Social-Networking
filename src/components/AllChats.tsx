import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { ThemeContext } from "../context/ThemeProvider";
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
  const { theme } = useContext<ThemeContext>(ThemeContext);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const userDocRef = currentUser?.uid
        ? doc(db, "userChats", currentUser.uid)
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

  const handleSendMessage = async (chatId: string, message: string) => {
    // Создаем новую дату для нового сообщения
    const date = Timestamp.now();

    if (!currentUser) return;

    // Обновляем чат локально
    setChats((prevChats) => {
      const updatedChats = prevChats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            lastMessage: {
              text: message,
              senderId: currentUser.uid,
              date,
            },
            date,
          };
        }
        return chat;
      });
      // Сортируем чаты заново
      updatedChats.sort((a, b) => b.date.toMillis() - a.date.toMillis());
      return updatedChats;
    });

    // Обновляем чат в Firestore
    await updateDoc(doc(db, "chats", chatId), {
      lastMessage: {
        text: message,
        senderId: currentUser.uid,
        date,
      },
      date,
    });
  };

  if (!theme) {
    return null;
  }

  return (
    <div>
      {chats.length > 0 &&
        chats
          .sort((a, b) => {
            if (!a.date || !b.date) {
              return 0;
            }
            return b.date.toMillis() - a.date.toMillis();
          })
          .map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              handleSelect={handleSelect}
              selectedUserId={selectedUserId}
              handleSendMessage={handleSendMessage}
              theme={theme}
            />
          ))}
    </div>
  );
}

export default AllChats;
