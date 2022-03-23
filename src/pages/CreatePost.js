import React, { useState, useEffect } from "react";

// addDoc allows to add document to our table(posts) on firestore db
// collection: we want to reference the collection(tables we have), we can have users, posts, categories table etc
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config"; // db // connection to firebase database
import { useNavigate } from "react-router-dom";

//
//
function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  // so we want to reference the collection(actual table) to post to(to push our data to)
  // collect take 2 argument, the firestore db & the table we are referencing(pointing to/postin to)
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  // always set the rules in firestore to allow read and write to its db as true(if true)
  const createPost = async () => {
    // addDoc accept 2 argument, 1st the collect referenced, 2nd is the data we want to push to post
    await addDoc(postsCollectionRef, {
      // it a NOSQL data structure, so we can put them in no particular order
      title,
      postText,

      // we want to send the author who logged in with google auth, google gives us a way to
      // get the post author from their login credential
      // so we want the author to carry an object with name and the id
      author: {
        //the logged in details of the google acct is store in the auth from firebase auth
        name: auth.currentUser.displayName, // we get the name from auth(actually google give us the name here)
        id: auth.currentUser.uid, // with this method google generate the id for us using the logged in details
      },
    });
    navigate("/"); //redirect to home
  };

  // diverting/securing route when the  user is not authenticated(not logged in)
  useEffect(() => {
    if (!isAuth) {
      // redirect to login page if isAuth is false
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
