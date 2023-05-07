import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import Chat from "./Chat";
import SearchMsg from "./SearchMsg";
import FilteredMsg from "./FilteredMsg";
import { ChatContext } from "../Context/ChatContext";

const RightPanel = () => {
  const [showFncPnl, setShowFncPnl] = useState(false);
  const [srchmsgInput, setSrchmsgInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageId, setMessageId] = useState("");

  const { data } = useContext(ChatContext);

  console.log(messageId, "messageId");

  const styles = {
    extraPanel: {
      height: "100%",
      width: "26%",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    extraHeader: {
      height: "60px",
      width: "95%",
      backgroundColor: "#f0f2f5",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "20px",
      paddingLeft: "15px",
      borderLeft: "1px solid #dadce0",
      marginRight: "1px",
    },
    rightPanel66: {
      width: showFncPnl ? "40%" : "66%",
    },
  };

  const renderMsg = () => {
    const filteredMsg = [];
    if (srchmsgInput === "") {
      return (
        <p style={{ padding: "20px", textAlign: "center", color: "#54656f" }}>
          Search for messages with {data?.user?.displayName}
        </p>
      );
    } else {
      messages.filter((m) => {
        if (m.textMessage.toLowerCase().includes(srchmsgInput.toLowerCase())) {
          filteredMsg.push(
            <FilteredMsg key={m.id} props={{ m, setMessageId }} />
          );
        }
      });
    }
    return filteredMsg;
  };

  return (
    <>
      <div className="rightpanel-container" style={styles.rightPanel66}>
        {data.chatId !== "null" ? (
          <>
            <ChatHeader data={{ data, setShowFncPnl }} />
            <Chat
              props={{ messages, setMessages }}
              msgId={{ messageId, setMessageId }}
            />
            <ChatFooter />
          </>
        ) : (
          <>
            <div className="chat-bkg">
              <div className="chat-preview"></div>
            </div>
            <h1>WhatsApp Web</h1>
          </>
        )}
      </div>
      {showFncPnl ? (
        <div style={styles.extraPanel}>
          <div style={styles.extraHeader}>
            <FontAwesomeIcon
              icon={faXmark}
              size="xl"
              style={{ color: "#54656f", cursor: "pointer" }}
              onClick={() => {
                setShowFncPnl(false);
                setMessageId("");
                setSrchmsgInput("");
              }}
            />
            <p>Search Messages</p>
          </div>
          <div className="people-container">
            <SearchMsg props={{ srchmsgInput, setSrchmsgInput }} />
            <div className="chats-container">{renderMsg()}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RightPanel;
