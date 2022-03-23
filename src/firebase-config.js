//For julius firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0ltZNmIhaJiMAUlLwqfOUt_5AQg1_VkM",
  authDomain: "blogproject-203a9.firebaseapp.com",
  projectId: "blogproject-203a9",
  storageBucket: "blogproject-203a9.appspot.com",
  messagingSenderId: "915707708251",
  appId: "1:915707708251:web:fabb45c41f1de82a76507e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// connection needed from firebase for our app
export const db = getFirestore(app); // connection to firebase database

// once google approves login the logged in details of the google acct come to be populated here(auth)
export const auth = getAuth(app); // connect to firebase authentication

export const provider = new GoogleAuthProvider(); // connection to google auth provider

//
//
//
//

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDc7PJ9309GQRO0v2-mCUhBIWpOAnNyec8",
//   authDomain: "blogproject-92aa7.firebaseapp.com",
//   projectId: "blogproject-92aa7",
//   storageBucket: "blogproject-92aa7.appspot.com",
//   messagingSenderId: "135318509256",
//   appId: "1:135318509256:web:034fab8084a0ad39e3b7fd",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
