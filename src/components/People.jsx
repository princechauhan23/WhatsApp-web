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

const People = () => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
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
  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));

      // console.log(res, res.exists(), "res exists");
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
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

    setUser(null);
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
    }
  };

  return (
    <div className="people-container">
      <SearchChat props={{ user, setUser }} />
      {user ? (
        <div className="chats-a3" onClick={handleSelect}>
          <div className="aa4">
            <UserLogo img={user.photoURL} />
          </div>
          <div className="aa5">
            <div className="chat-user">
              <div className="chat-user-name">{user.displayName}</div>
              <div className="chat-time">today</div>
            </div>
            <div className="chat-latest">
              <div className="chat-last-msg">{"Last message"}</div>
              <div className="chat-unread-count">{1}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chats-container">{renderChats()}</div>
      )}
    </div>
  );
};

export default People;
