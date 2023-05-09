import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const SearchChat = ({ props }) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    var users = [];
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== currentUser.uid) {
          users.push(doc.data());
        }
      });

      setSuggestedUsers(users);
    };

    getUsers();
  }, []);

  // handleSearch function to search for a user
  const sgtuser = [];
  const handleSearch = () => {
    suggestedUsers.filter((user) => {
      if (props.searchInput === "") {
        props.setUser([]);
      } else if (
        user.displayName.toLowerCase().includes(props.searchInput.toLowerCase())
      ) {
        sgtuser.push(user);
      }
    });
    props.setUser(sgtuser);
  };

  const handleback = () => {
    props.setSearchInput("");
    props.setUser([]);
  };

  return (
    <div className="searchBar-container">
      <div className="searchBar">
        {props.searchInput === "" ? (
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#54656f" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handleback}
            style={{ color: "#54656f" }}
          />
        )}
        <input
          type="text"
          name="search"
          value={props.searchInput}
          autoComplete="off"
          onKeyUp={handleSearch}
          placeholder="Search or start new chat"
          onChange={(e) => props.setSearchInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchChat;
