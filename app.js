
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  import { getAuth ,
    onAuthStateChanged , 
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword ,
    signOut 


   } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";











  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDTqbuUbJUjceCWDWv5ZkBgZAigpALQiUU",
    authDomain: "login-out-sign-up.firebaseapp.com",
    projectId: "login-out-sign-up",
    storageBucket: "login-out-sign-up.appspot.com",
    messagingSenderId: "904637887174",
    appId: "1:904637887174:web:4415a1d0b32ef8bca75dc7",
    measurementId: "G-NTHS1QJR6Z"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  //   console.log("app=>>" , app);
  const auth = getAuth(app);
//   console.log("auth=>>" , auth);\


var Signup_email = document.getElementById("Signup_email")
var Signup_password = document.getElementById("Signup_password")
var signup_btn = document.getElementById("signup_btn")

var login_email = document.getElementById("login_email")
var login_password = document.getElementById("login_password")
var login_btn = document.getElementById("login_btn")



var auth_container = document.getElementById("auth_container")
var user_container = document.getElementById("user_container")



var user_email = document.getElementById("user_email")
var logout_btn = document.getElementById("logout_btn")

signup_btn.addEventListener("click" , createUserAccount)
login_btn.addEventListener("click" , logInUser)
logout_btn.addEventListener("click" , logOut)



onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("user is logged in");
        auth_container.style.display = "none"
        user_container.style.display = "block"
        user_email.innerText = user.email;
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
        console.log("user is not logged in");
        auth_container.style.display = "block"
        user_container.style.display = "none"
        user_email.innerText = user.email;
      // User is signed out
      // ...
    }
  });
  


  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });



  function createUserAccount () {
    // console.log(Signup_email.value);
    // console.l'og(Signup_password.value);


    createUserWithEmailAndPassword(auth, Signup_email.value, Signup_password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("user=>" , user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
  }



  function logInUser() {
    // console.log(login_email.value);
    // console.log(login_password.value);

    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

  }


  function logOut() {
    
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      

  }