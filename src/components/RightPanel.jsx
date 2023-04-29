import { useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import Chat from "./Chat";
import { ChatContext } from "../Context/ChatContext";

const RightPanel = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="rightpanel-container">
      {data.chatId !== "null" ? (
        <>
          <ChatHeader data={{ data }} />
          <Chat />
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
  );
};

export default RightPanel;
