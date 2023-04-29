import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import SearchChat from "./SearchChat";
import { db } from "../firebase";
import Chats from "./Chats";
import UserLogo from "./UserLogo";
import {
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import ErrorBoundary from "./ErrorBoundary";

const People = () => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [err, setErr] = useState(false);

  // getting the currentUser through context api
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // handleSelect fn to select a user
  const handleSelect = async (u) => {
    // check whether the group(chats in firestore) exists, if not create
    const combineId =
      currentUser.uid > u.uid
        ? currentUser.uid + u.uid
        : u.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: u.uid,
            displayName: u.displayName,
            photoURL: u.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", u.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setErr(true);
      console.log(err);
    }

    setUser([]);
    setSearchInput("");
  };

  const renderChats = () => {
    const chatsArray = [];
    if (chats) {
      Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          chatsArray.push(<Chats key={chat[0]} props={{ chat }} />);
        });
      return chatsArray;
    } else {
      return <h1>No chats</h1>; // return no chats while there is no chats
    }
  };

  return (
    <div className="people-container">
      <SearchChat props={{ user, setUser, searchInput, setSearchInput }} />
      {user.length ? (
        <>
          <p id="search-result">search result</p>
          {user.map((u) => (
            <div
              key={u.uid}
              className="chats-a3"
              onClick={() => handleSelect(u)}
            >
              <div className="aa4">
                <UserLogo img={u.photoURL} />
              </div>
              <div className="aa5">
                <div className="chat-user">
                  <div className="chat-user-name">{u.displayName}</div>
                  {/* <div className="chat-time">today</div> */}
                </div>
                <div className="chat-latest">
                  {/* <div className="chat-last-msg">{"Last message"}</div> */}
                  {/* <div className="chat-unread-count">{1}</div> */}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="chats-container">{renderChats()}</div>
      )}
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <People />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
