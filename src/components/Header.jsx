import { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../Context/UserContext";

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(currentUser, "currentUser fetched in Header.jsx");

  const handleMenu = () => {
    document.getElementById("menuDropdown").classList.toggle("show");
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out Successfully", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#00a884",
          },
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error); //consoleeeeeeeeeee
        toast.error("Unable to log out", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#e15549",
          },
        });
      });
  };

  return (
    <div className="header">
      <div id="user-logo-container">
        <div className="user-logo user-logo-a12">
          <img src={currentUser.photoURL} alt="logo" />
        </div>
      </div>
      <div id="user-other">
        <div className="user-a2" id="community">
          <FontAwesomeIcon
            id="community-icon"
            icon={faUserGroup}
            style={{
              "--fa-primary-color": "#54656f",
              "--fa-secondary-color": "#54656f",
            }}
          />
        </div>
        <div className="user-a2" id="chat">
          <FontAwesomeIcon
            id="chat-icon"
            icon="fa-solid fa-message"
            style={{ color: "#54656f" }}
          />
        </div>
        <div className="user-a2" id="menu">
          <FontAwesomeIcon
            id="menu-icon"
            icon={faEllipsisVertical}
            style={{ color: "#54656f" }}
            onClick={handleMenu}
          />
          <div id="menuDropdown" className="dropdown-content">
            <div>New group</div>
            <div>Settings</div>
            <div onClick={logOut}>Log out</div>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
