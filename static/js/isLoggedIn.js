import { getFirestore,doc,getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
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
const uidCookieValue = getCookie('uid');
try{
    await onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href='/intro'
      }
      if (user.uid!=uidCookieValue) {
        window.location.href='/intro'
      }
      const docRef = doc(db, "users", uidCookieValue);
      const docSnap = await getDoc(docRef);
      const a = docSnap.data()
      if(a.myprofileset == 'false'){
        window.location.href='/welcome'
      }
    });
}catch(err){
    alert('error!')
    window.location.href='/intro'
}