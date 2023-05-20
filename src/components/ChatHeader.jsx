import { useContext, useState } from "react";
import Modal from "./Modal";
import { db } from "../firebase";
import {
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../Context/UserContext";
import { ChatContext } from "../Context/ChatContext";

const ChatHeader = ({ data, setContactInfo, setsrchInMsg, setShowmodal }) => {
  const [showClearMsgPortal, setShowClearMsgPortal] = useState(false);
  const [showDeletechatPortal, setShowDeletechatPortal] = useState(false);

  // chatHeader Menu function
  const handleMenubtn = () => {
    document.getElementById("chatMenuDropdown").classList.toggle("show");
    if (document.getElementById("menuDropdown").classList.toggle("show")) {
      document.getElementById("menuDropdown").classList.toggle("show");
    }
  };

  // search btn in chat header function
  const handleSearchBtn = () => {
    data.setShowFncPnl(true);
    setContactInfo(false);
    setsrchInMsg(true);
    if (
      document.getElementById("chatMenuDropdown").classList.contains("show")
    ) {
      document.getElementById("chatMenuDropdown").classList.toggle("show");
    }
    if (document.getElementById("menuDropdown").classList.toggle("show")) {
      document.getElementById("menuDropdown").classList.toggle("show");
    }
  };

  // contactInfo and chatheader profile clickable function to show the extra panel.
  const profileUtilityfnc = () => {
    data.setShowFncPnl(true);
    setsrchInMsg(false);
    setContactInfo(true);
    if (
      document.getElementById("chatMenuDropdown").classList.contains("show")
    ) {
      document.getElementById("chatMenuDropdown").classList.toggle("show");
    }
    if (document.getElementById("menuDropdown").classList.toggle("show")) {
      document.getElementById("menuDropdown").classList.toggle("show");
    }
  };

  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(UserContext);
  const chatUser = data.data?.user?.uid;
  const combineId =
    currentUser.uid > chatUser
      ? currentUser.uid + chatUser
      : chatUser + currentUser.uid;

  // delete chat to the user with all messages and media
  const handleDeleteChat = async () => {
    try {
      const res = await getDoc(doc(db, "chats", combineId));

      if (res.exists()) {
        await deleteDoc(doc(db, "chats", combineId));
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combineId]: deleteField(),
      });

      await updateDoc(doc(db, "userChats", chatUser), {
        [combineId]: deleteField(),
      });
    } catch (error) {
      console.log(error, "error in deleting chat");
    }
    setShowmodal.setShowModal(false);
    data.setShowFncPnl(false);
    dispatch({ type: "DELETE_CHAT" });
    setShowDeletechatPortal(false);
  };

  // Clear all the messages to the chat
  const handleClearmsg = async () => {
    try {
      await updateDoc(doc(db, "chats", combineId), {
        messages: [],
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combineId + ".lastMessage"]: {
          textMessage: "",
        },
        [combineId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", chatUser), {
        [combineId + ".lastMessage"]: {
          textMessage: "",
        },
        [combineId + ".date"]: serverTimestamp(),
      });

      dispatch({ type: "CHANGE_USER", payload: data.data?.user });
      // dispatch({ type: "DELETE_CHAT" });
      if (
        document.getElementById("chatMenuDropdown").classList.contains("show")
      ) {
        document.getElementById("chatMenuDropdown").classList.toggle("show");
      }
    } catch (error) {
      console.log(error, "error in deleting messages");
    }
    setShowmodal.setShowModal(false);
    data.setShowFncPnl(false);
    data.setMessageId("");
    setShowClearMsgPortal(false);
  };

  return (
    <div id={data.data?.chatId} className="chatHeader">
      <div
        className="chatHeader-profile"
        onClick={() => {
          profileUtilityfnc();
        }}
      >
        <div id="chat-logo-container">
          <div className="user-logo chat-header-logo">
            <img src={data.data?.user?.photoURL} alt="Avatar" />
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          profileUtilityfnc();
        }}
        className="chatHeader-name"
      >
        {data.data?.user?.displayName}
      </div>
      <div className="chatHeader-menu">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onClick={() => {
            handleSearchBtn();
          }}
          style={{ cursor: "pointer" }}
        />
        <FontAwesomeIcon
          id="menu-icon"
          icon={faEllipsisVertical}
          style={{ color: "#54656f" }}
          onClick={() => handleMenubtn()}
        />
        <div id="chatMenuDropdown" className="dropdown-content">
          <div
            onClick={() => {
              profileUtilityfnc();
            }}
          >
            Contact info
          </div>
          <div
            onClick={() => {
              setShowClearMsgPortal(true);
              setShowmodal.setShowModal(true);
              setShowDeletechatPortal(false);
            }}
          >
            Clear messages
          </div>
          <div
            onClick={() => {
              setShowDeletechatPortal(true);
              setShowmodal.setShowModal(true);
              setShowClearMsgPortal(false);
            }}
          >
            Delete chat
          </div>
          {setShowmodal.showModal ? (
            <Modal>
              <div>
                {!showClearMsgPortal ? (
                  <>
                    <p style={{ fontSize: "19px" }}>
                      Would you like to
                      <span style={{ color: "red" }}>
                        {" "}
                        Delete chat for {data.data?.user?.displayName}
                      </span>
                    </p>
                    <div className="modalButtons">
                      <button
                        id="cancleBtn"
                        style={{
                          color: "#00a884",
                          backgroundColor: "#faeff0",
                        }}
                        onClick={() => setShowmodal.setShowModal(false)}
                      >
                        Cancle
                      </button>
                      <button
                        id="continueBtn"
                        onClick={() => {
                          handleDeleteChat();
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: "19px" }}>
                      Would you like to
                      <span style={{ color: "red" }}>
                        {" "}
                        clear messages for {data.data?.user?.displayName}
                      </span>
                    </p>
                    <div className="modalButtons">
                      <button
                        id="cancleBtn"
                        style={{
                          color: "#00a884",
                          backgroundColor: "#faeff0",
                        }}
                        onClick={() => {
                          setShowmodal.setShowModal(false);
                        }}
                      >
                        Cancle
                      </button>
                      <button id="continueBtn" onClick={() => handleClearmsg()}>
                        Continue
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
