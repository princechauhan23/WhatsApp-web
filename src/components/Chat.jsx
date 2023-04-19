import { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { ChatContext } from "../Context/ChatContext";
import Message from "./Message";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="chat-container">
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </div>
  );
};

export default Chat;
