import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth"; // the popUp to be able to login with google
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    // the signInWithPopup takes in the auth, provider that give access to login with google
    // from firebase auth
    signInWithPopup(auth, provider).then((result) => {
      // we set the localStorage to have {isAuth: true} to still remain login even
      // after we refresh or close tab or close browser
      localStorage.setItem("isAuth", true);
      setIsAuth(true); // set isAuth true if the google email passes the firebase validation

      // we can only make use of useNavigate inside Router wrapped component so the
      navigate("/"); // and redirect to home page
    });
  };

  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
