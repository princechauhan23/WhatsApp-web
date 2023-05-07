import { useRef, useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Message = ({ message, msgid }) => {
  const [originalBackgroundColor, setOriginalBackgroundColor] = useState("");
  const { currentUser } = useContext(UserContext);
  const ref = useRef();

  const date = new Date(message?.date?.seconds * 1000)
    .toTimeString()
    .slice(0, 5);

  useEffect(() => {
    if (msgid?.messageId !== "") {
      const element = document.getElementById(msgid.messageId);
      const children = element?.children[0];
      // scroll the element into view
      element.scrollIntoView(true, { behavior: "smooth", block: "center" });
      // get the original background color
      setOriginalBackgroundColor(children.style.backgroundColor);
      // set the background color and Add transition
      children.style.transition = "background-color 0.6s ease-in-out";
      children.style.backgroundColor = "#e0e0e0";
      // remove the background color after 0.5s
      setTimeout(() => {
        console.log(children.style.backgroundColor, "children");
        console.log(originalBackgroundColor, "originalBackgroundColor");
        children.style.backgroundColor = originalBackgroundColor;
        setOriginalBackgroundColor("");
      }, 600);
    } else {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, msgid?.messageId]);

  return (
    <div
      ref={ref}
      id={message?.id}
      className={`message ${message?.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message-container">
        {message?.img && <img className="msgImage" src={message?.img} alt="" />}
        <div className="message-content">{message?.textMessage}</div>
        <div className="message-time">{date}</div>
      </div>
    </div>
  );
};

export default Message;
