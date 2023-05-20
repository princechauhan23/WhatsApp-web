import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faImage,
  faLock,
  faBan,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SearchMsg from "./SearchMsg";
import FilteredMsg from "./FilteredMsg";

const ExtraPanel = ({ props, setShowFncPnl, setMessageId, setShowModal }) => {
  const [srchmsgInput, setSrchmsgInput] = useState("");

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
  };

  const renderMsg = () => {
    const filteredMsg = [];
    if (srchmsgInput === "") {
      return (
        <p style={{ padding: "20px", textAlign: "center", color: "#54656f" }}>
          Search for messages with {props.data?.user?.displayName}
        </p>
      );
    } else {
      props.messages.filter((m) => {
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
        {props.srchInMsg ? <p>Search Messages</p> : <p>Contact info</p>}
      </div>
      <div className="people-container">
        {props.srchInMsg ? (
          <>
            <SearchMsg props={{ srchmsgInput, setSrchmsgInput }} />
            <div className="chats-container">{renderMsg()}</div>
          </>
        ) : (
          <>
            <div className="contact-info">
              <div className="contact-info-profile">
                <img src={props.data?.user?.photoURL} alt="profile" />
              </div>
              <p>{props.data?.user?.displayName}</p>
            </div>
            <div className="contact-media">
              <p>Media, Docs </p>
              <div className="media-m1">
                <div className="media-m2">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="2xl"
                    style={{ color: "#c2c2c2" }}
                  />
                </div>
                <div className="media-m2">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="2xl"
                    style={{ color: "#c2c2c2" }}
                  />
                </div>
                <div className="media-m2">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="2xl"
                    style={{ color: "#c2c2c2" }}
                  />
                </div>
                <div className="media-m2">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="2xl"
                    style={{ color: "#c2c2c2" }}
                  />
                </div>
                <div className="media-m2">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="2xl"
                    style={{ color: "#c2c2c2" }}
                  />
                </div>
              </div>
            </div>
            <div className="contact-info-opt">
              <div className="encryption">
                <FontAwesomeIcon
                  icon={faLock}
                  size="lg"
                  style={{ color: "#54656f" }}
                />
                <div>
                  <p>Encryption</p>
                  <p>Messages are end-to-end encrypted</p>
                </div>
              </div>
              <div className="encryption ridofbtn">
                <FontAwesomeIcon
                  icon={faBan}
                  size="lg"
                  style={{ color: "red" }}
                />
                <p style={{ color: "red" }}>
                  Block {props.data?.user?.displayName}
                </p>
              </div>
              <div
                className="encryption ridofbtn"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ color: "red" }}
                />
                <p style={{ color: "red" }}>Delete chat</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExtraPanel;
