import { useContext } from "react";
import UserLogo from "./UserLogo";
import { ChatContext } from "../Context/ChatContext";

const Chats = ({ props }) => {
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const date = new Date(
    props.chat[1]?.date?.seconds * 1000
  ).toLocaleDateString();
  const lastMessage = props.chat[1]?.lastMessage?.textMessage || "";

  return (
    <div
      className="chats-a3"
      onClick={() => handleSelect(props.chat[1]?.userInfo)}
    >
      <div className="aa4">
        <UserLogo img={props.chat[1]?.userInfo?.photoURL} />
      </div>
      <div className="aa5">
        <div className="chat-user">
          <div className="chat-user-name">
            {props.chat[1]?.userInfo?.displayName}
          </div>
          <div className="chat-time">{date}</div>
        </div>
        <div className="chat-latest">
          <div className="chat-last-msg">{lastMessage}</div>
          {/* <div className="chat-unread-count">{1}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Chats;
