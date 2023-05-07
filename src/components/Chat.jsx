import { useEffect, useContext } from "react";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { ChatContext } from "../Context/ChatContext";
import Message from "./Message";

const Chat = ({ props, msgId }) => {
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && props.setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="chat-container">
      {props.messages.map((m) => (
        <Message key={m.id} message={m} msgid={msgId} />
      ))}
    </div>
  );
};

export default Chat;
