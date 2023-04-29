import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useRef } from "react";
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
  const ref = useRef();

  // Added keydown event to automate the typing of the message
  document.addEventListener("keydown", (e) => lettersOnly(e));

  const lettersOnly = (e) => {
    var charCode = e.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
      ref.current.focus();
      document.removeEventListener("keydown", (e) => lettersOnly(e));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

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
          ref={ref}
          id="chatfooter-input"
          type="text"
          value={textMessage}
          placeholder="Type a message"
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {textMessage !== "" ? (
          <span id="sendbtn" className="send-message-btn" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#54656f" }} />
          </span>
        ) : (
          <span className="send-message-btn">
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#6f7d84" }} />
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatFooter;
