import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

const ChatHeader = ({ data, setContactInfo, setsrchInMsg }) => {
  const handleMenu = () => {
    document.getElementById("chatMenuDropdown").classList.toggle("show");
    if (document.getElementById("menuDropdown").classList.toggle("show")) {
      document.getElementById("menuDropdown").classList.toggle("show");
    }
  };
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

  return (
    <div id={data.data?.chatId} className="chatHeader">
      <div className="chatHeader-profile">
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
            data.setShowFncPnl(true);
            setContactInfo(false);
            setsrchInMsg(true);
          }}
          style={{ cursor: "pointer" }}
        />
        <FontAwesomeIcon
          id="menu-icon"
          icon={faEllipsisVertical}
          style={{ color: "#54656f" }}
          onClick={handleMenu}
        />
        <div id="chatMenuDropdown" className="dropdown-content">
          <div
            onClick={() => {
              profileUtilityfnc();
            }}
          >
            Contact info
          </div>
          <div>Clear messages</div>
          <div>Delete chat</div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
