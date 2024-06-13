import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import MessageChat from "../components/MessageChat";
import { Timestamp } from "firebase/firestore";

export type MessageType = {
  id: string;
  senderId: string;
  text: string;
  date: Timestamp;
};

function ContainerDialog() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId, currentUser]);

  const sortedMessages = messages.sort(
    (a, b) => a.date.seconds - b.date.seconds
  );

  return (
    <div className="h-full px-[40px] xl:px-[80px] w-full mt-[30px]">
      {sortedMessages.map((m) => (
        <div
          key={m.id}
          className={`mb-[10px] ${
            m.senderId === currentUser?.uid ? "justify-end" : ""
          }`}>
          <MessageChat message={m} />
        </div>
      ))}
    </div>
  );
}

export default ContainerDialog;
