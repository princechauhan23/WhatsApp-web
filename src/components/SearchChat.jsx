import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const SearchChat = ({ props }) => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);

  // handleSearch function to search for a user
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        props.setUser(doc.data());
      });
      console.log(props.user, "props.user"); // consoleeeeeeeeeee
    } catch (error) {
      setErr(true);
      console.log(err, "err");
    }
  };

  // handleKeydown fn  for enter key
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleback = () => {
    setUsername("");
    props.setUser(null);
  };

  return (
    <div className="searchBar-container">
      <div className="searchBar">
        {username === "" ? (
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#54656f" }}
          />
        ) : (
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleback} style={{ color: "#54656f" }} />
        )}
        <input
          type="text"
          name="search"
          value={username}
          onKeyDown={handleKey}
          placeholder="Search or start new chat"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchChat;
