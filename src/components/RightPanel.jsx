import { useContext, useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import Chat from "./Chat";
import ExtraPanel from "./ExtraPanel";
import { ChatContext } from "../Context/ChatContext";

const RightPanel = () => {
  const [showFncPnl, setShowFncPnl] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageId, setMessageId] = useState("");
  const [contactInfo, setContactInfo] = useState(false);
  const [srchInMsg, setsrchInMsg] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data } = useContext(ChatContext);

  useEffect(() => {
    setMessageId("");
    setShowFncPnl(false);
  }, [data.chatId]);

  const styles = {
    rightPanel66: {
      width: showFncPnl ? "40%" : "66%",
    },
  };

  return (
    <>
      <div className="rightpanel-container" style={styles.rightPanel66}>
        {data.chatId !== "null" ? (
          <>
            <ChatHeader
              data={{ data, setShowFncPnl }}
              setContactInfo={setContactInfo}
              setsrchInMsg={setsrchInMsg}
              setShowmodal={{ showModal, setShowModal }}
            />
            <Chat props={{ messages, setMessages }} msgId={{ messageId }} />
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
        <ExtraPanel
          props={{ messages, data, contactInfo, srchInMsg }}
          setShowFncPnl={setShowFncPnl}
          setMessageId={setMessageId}
          setShowModal={setShowModal}
        />
      ) : null}
    </>
  );
};

export default RightPanel;
