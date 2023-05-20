import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faXmark,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
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
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ChatFooter = () => {
  const [textMessage, setTextMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(UserContext);
  const { data } = useContext(ChatContext);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [data]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    // check if there is an image
    if (img) {
      setLoading(true);
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              textMessage,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      // if there is no image send the text message only
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
    }
    setImg(null);
    setTextMessage("");
    setLoading(false);
  };

  const removeSelectedFile = () => {
    setImg(null);
    var selectedImage = document.getElementById("fileInput");
    selectedImage.value = "";
  };

  return (
    <div className="chatFooter-container">
      <div className="searchBar" id="chat-searchBar">
        <input
          ref={inputRef}
          id="chatfooter-input"
          type="text"
          value={textMessage}
          autoComplete="off"
          placeholder="Type a message"
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          id="fileInput"
          type="file"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        ></input>
        <span id="paperclip">
          {loading ? (
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              style={{ color: "#54656f" }}
            />
          ) : (
            <>
              <label htmlFor="fileInput" className="send-btns">
                <FontAwesomeIcon
                  icon={faPaperclip}
                  style={{ color: "#54656f" }}
                />
              </label>
              {img ? (
                <FontAwesomeIcon
                  icon={faXmark}
                  size="sm"
                  style={{ color: "#54656f" }}
                  onClick={removeSelectedFile}
                />
              ) : null}
            </>
          )}
        </span>
        {textMessage !== "" || img ? (
          <span className="send-btns send-arrow" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#54656f" }} />
          </span>
        ) : (
          <span className="send-btns send-arrow">
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#6f7d84" }} />
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatFooter;
