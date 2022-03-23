import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"; //doc refers to the document in the particular table(posts)
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    // to delete frm firebase db we can use the deleteDoc
    // but we need to reference particular item(doc) to delete
    const postDoc = doc(db, "posts", id); // doc takes 3 argument the db, the collection(table name) and the id of the document
    await deleteDoc(postDoc);
  };

  // or if there is an the error that we u delete and d page fails to reload
  // keep the useEffect array empty and add window.location.reload() to the deletePost function. It will reload the entire page and not the dom
  // const deletePost = async (id) => {
  //   const postDoc = doc(db, 'posts-database', id)
  //   await deleteDoc(postDoc)
  //   window.location.reload()
  // }

  useEffect(() => {
    const getPosts = async () => {
      // to get items frm firebase db we can use the getDocs
      const data = await getDocs(postsCollectionRef);

      //use this method to get the data() object from the data that made reference to posts
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]); //it should re-render when we delete a post

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {
                  // we need check if the user tat created the post is the one logged in
                  // if the isAuth is true and the author post id match the google current.uid
                  isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      {" "}
                      &#128465;
                    </button>
                  )
                }
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
