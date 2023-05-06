import { useRef, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(UserContext);
  const ref = useRef();

  console.log(message, "message")

  const date = new Date(message.m?.date?.seconds * 1000)
    .toTimeString()
    .slice(0, 5);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message.m]);

  return (
    <div
      ref={ref}
      id={message.m?.id}
      className={`message ${message.m?.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message-container">
        {message.m?.img && <img className="msgImage" src={message.m?.img} alt="" />}
        <div className="message-content">{message.m?.textMessage}</div>
        <div className="message-time">{date}</div>
      </div>
    </div>
  );
};

export default Message;
