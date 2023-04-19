import { useRef, useContext, useEffect } from "react";
// import { ChatContext } from "../Context/ChatContext";
import { UserContext } from "../Context/UserContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(UserContext);
  // const { data } = useContext(ChatContext);

  const date = new Date(message.date?.seconds * 1000)
    .toTimeString()
    .slice(0, 5);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      id={message.id}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message-container">
        <div className="message-content">{message.textMessage}</div>
        <div className="message-time">{date}</div>
      </div>
    </div>
  );
};

export default Message;
