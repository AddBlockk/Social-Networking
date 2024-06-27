import React, { useContext, useEffect, useState, useRef } from "react";
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

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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
    <div className="h-full px-[40px] xl:px-[80px] mt-[20px] w-full">
      {sortedMessages.map((m) => (
        <div
          key={m.id}
          className={`mb-[10px] ${
            m.senderId === currentUser?.uid ? "flex justify-end" : ""
          }`}>
          <MessageChat key={m.id} message={m} messagesEndRef={messagesEndRef} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ContainerDialog;
