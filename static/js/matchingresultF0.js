
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
    import { getAuth ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
    import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
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
    const db = getFirestore(app);
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName === name) {
            return decodeURIComponent(cookieValue);
          }
        }
        return null;
      }
      const uid = getCookie('uid');
      if(!uid){
          window.location.href='/login'
      }
    try{
        await onAuthStateChanged(auth, async(user) => {
        if (user) {
            const docRef = doc(db, "friendSubmitdata", uid);
            const docSnap = (await getDoc(docRef)).data() ?? undefined;
            if(docSnap){
                document.getElementById('main-text').textContent = '아직 매칭되지 않았습니다'
                document.getElementById('sub-text').textContent = '매칭 결과를 기다려주세요.'
            }
        } else {
            console.log('not loggedin!')
            window.location.href='/login'
        }
    });
    }catch(error){
        alert('error!')
        window.location.href='/'
    }
    