import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, LoginWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCqUwDuUoBpsJigFmaTur2WdRsOsuMkNFc",
    authDomain: "login-project-bc694.firebaseapp.com",
    projectId: "login-project-bc694",
    storageBucket: "login-project-bc694.firebasestorage.app",
    messagingSenderId: "323110630115",
    appId: "1:323110630115:web:c385bc8f2852dec64f0bd6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  

  const Login=document.getElementById('submitLogin');
  Login.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
     const password=document.getElementById('password').value;
     const auth=getAuth();

     LoginWithEmailAndPassword(auth, email, password)
     .then((userCredential)=>{
        showMessage('login successful')
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href="LOGIN.html";
     })
     .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('invalid email or password');
        }
        else{
            showMessage('account does not exist');
        }
     })
  
  })
  