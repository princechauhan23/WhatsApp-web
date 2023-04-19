import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { UserContext } from "../Context/UserContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const ChatFooter = () => {
  const [textMessage, setTextMessage] = useState("");

  const { currentUser } = useContext(UserContext);
  const { data } = useContext(ChatContext);

  const sendMessage = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        textMessage,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        textMessage,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        textMessage,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setTextMessage("");
  };

  return (
    <div className="chatFooter-container">
      <div className="searchBar" id="chat-searchBar">
        <input
          id="chatfooter-input"
          type="text"
          value={textMessage}
          placeholder="Type a message"
          onChange={(e) => setTextMessage(e.target.value)}
        />
        <span className="send-message-btn" onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#54656f" }} />
        </span>
      </div>
    </div>
  );
};

export default ChatFooter;
