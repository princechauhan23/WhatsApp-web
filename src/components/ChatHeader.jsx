import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

const ChatHeader = ({ data }) => {
  const handleMenu = () => {
    document.getElementById("chatMenuDropdown").classList.toggle("show");
  };

  return (
    <div id={data.data?.chatId} className="chatHeader">
      <div className="chatHeader-profile">
        <div id="chat-logo-container">
          <div className="user-logo chat-header-logo">
            <img src={data.data?.user?.photoURL} alt="Avatar" />
          </div>
        </div>
      </div>
      <div className="chatHeader-name">{data.data?.user?.displayName}</div>
      <div className="chatHeader-menu">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onClick={() => data.setShowFncPnl(true)}
        />
        <FontAwesomeIcon
          id="menu-icon"
          icon={faEllipsisVertical}
          style={{ color: "#54656f" }}
          onClick={handleMenu}
        />
        <div id="chatMenuDropdown" className="dropdown-content">
          <div>Contact info</div>
          <div>Clear messages</div>
          <div>Delete chat</div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
