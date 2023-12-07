    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
    import { getAuth ,signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
    const firebaseConfig = {
    apiKey: "AIzaSyCu28T8AGnGothZa7rYrVIxurCbnatIKwk",
    authDomain: "newgongtingproject.firebaseapp.com",
    databaseURL: "https://newgongtingproject-default-rtdb.firebaseio.com",
    projectId: "newgongtingproject",
    storageBucket: "newgongtingproject.appspot.com",
    messagingSenderId: "437346281808",
    appId: "1:437346281808:web:f5a296945dff4429d26455"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    function deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    deleteCookie('uid')
    await signOut(auth)
    window.location.href='/intro'