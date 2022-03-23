import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth"; // firebase signOut option
import { auth } from "./firebase-config"; // auth from firebase

function App() {
  // note we didn't directly set the isAuth to false in our state but we set it to get
  // the value of isAuth frm the localstorage,so that when we reload page or close browser the localstoarhge will
  // give us the previous state of isAuth, if we are logged in previously we remail logged or if we are logged out we
  // remain logged out till we re-log in again
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    // signOut takes in the auth from firebase signed in
    signOut(auth).then(() => {
      // don't forget to clear localStorage
      localStorage.clear();
      setIsAuth(false); // if the auth in firebase is signed out then isAuth becomes false

      // we can't make use of useNavigate ouside Router so the
      // window.location.pathname is an alternative to locate a pathname/route
      window.location.pathname = "/login"; // and redirect to login page
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>

        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/createpost"> Create Post </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
