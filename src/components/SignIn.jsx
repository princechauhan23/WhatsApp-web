import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { auth, db, storage } from "../firebase";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import Add from "../images/addAvatar.png";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [bool, setBool] = useState(false);
  const navigate = useNavigate();

  console.log(phoneNumber, "phone number");

  // reChatcha verifier for phone auth
  function oncaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: () => {
            handleauthcode();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  async function handleauthcode() {
    try {
      if (phoneNumber.length < 14 && phoneNumber.length > 12) {
        await oncaptchaVerify();
        const appVerifier = window.recaptchaVerifier;

        // query to check if user exists
        const q = query(
          collection(db, "users"),
          where("phoneNumber", "==", phoneNumber)
        );
        try {
          const querySnapshot = await getDocs(q);
          if (querySnapshot.docs.length > 0) {
            setBool(false);
            // console.log("user exists");
          } else {
            setBool(true);
            // console.log("user does not exist");
          }
        } catch (err) {
          setBool(true);
          console.log(err, "error in checking user");
        }

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        window.confirmationResult = confirmationResult;
        setShowAuthCode(true);

        // toast notification for OTP sent
        toast.success("OTP sent to your phone number", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "00a884",
          },
        });

        // SMS sent. Prompt user to type the code from the message, then sign the
      } else {
        toast.error("Type the correct number!", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#e12b2b",
          },
        });
        return;
      }
    } catch (error) {
      console.log(error, "error in sending otp");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = e.target[1].value;
    const displayName = e.target[2].value || "";
    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(code);
      const user = result.user;
      // toast notification for Sign In
      toast.success("Signed In", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#00a884",
        },
      });

      // upload the file if the user sign in first time
      if (bool) {
        const file = e.target[3].files[0];
        // create a unique name for the file
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
        // upload file
        const uploadTask = await uploadBytesResumable(storageRef, file);
        getDownloadURL(uploadTask.ref).then(async (downloadURL) => {
          try {
            // update profile
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });

            // create user on firebase
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: displayName,
              phoneNumber: phoneNumber,
              photoURL: downloadURL,
            });

            // create empty user chats on firebase
            await setDoc(doc(db, "userChats", user.uid), {}, { merge: true });
            navigate("/");
            setLoading(false);
          } catch (error) {
            console.log(error, "error updating profile");
          }
        });
      } else {
        navigate("/");
        // console.log("user chats and profile already exists");
      }
    } catch (error) {
      setLoading(false);
      // toast notification for error
      toast.error("Authentication failed try again!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#00a884",
        },
      });
    }
  };

  return (
    <div className="formcontainer">
      <div className="formWraper">
        <span className="logo">WhatsApp</span>
        <span className="title">Sign In</span>
        <div id="sign-in-button"></div>
        <form className="form" onSubmit={handleSubmit}>
          <PhoneInput
            id="phone"
            country="IN"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
          <div className="getauthcode" onClick={handleauthcode}>
            Get OTP
          </div>
          <Toaster />
          {showAuthCode ? (
            <input
              required
              id="authcode"
              className="seccode"
              type="number"
              placeholder="Six digit code"
              // onChange={(e) => setCode(e.target.value)}
            />
          ) : null}
          {bool ? (
            <>
              <input type="text" placeholder="Display Name" />
              <label htmlFor="file" className="filelabel">
                <img src={Add} alt="logo" />
                <span id="AvatarText">Choose Avatar</span>
              </label>
            </>
          ) : null}
          <input
            id="file"
            type="file"
            name="avatar"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={(e) => {
              document.getElementById("AvatarText").innerHTML =
                e.target.files[0].name;
            }}
          ></input>
          <button type="submit">
            {loading ? (
              <FontAwesomeIcon
                icon={faCircleNotch}
                spin
                style={{ color: "#ffffff" }}
              />
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <p></p>
      </div>
    </div>
  );
};

export default SignIn;
