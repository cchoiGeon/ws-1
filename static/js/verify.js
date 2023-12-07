// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getStorage, ref,uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";
import { getAuth ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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
const storage = getStorage(app);
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
try{
  document.getElementById("subbutton").addEventListener('click',async(e)=>{
    e.preventDefault()
    alert('진행 중입니다. 확인 버튼을 누르신 후 잠시동안 기다려주세요.')
    const file = document.querySelector("#fileInput").files[0];
    const storageRef = ref(storage, 'images/'+Date.now()+file.name);
    const metadata = {
      contentType: 'image/jpeg',
    };
    const uploadTask = await uploadBytes(storageRef, file, metadata);
    const getURL = await getDownloadURL(storageRef);
    await onAuthStateChanged(auth, async(user) => {
      if (user) {
        await updateDoc(doc(db, "users", uid), {
          verify:'processing',
          verifyurl:getURL,
        });
        window.location.href='/myprofile'
      } else {
        console.log('not loggedin!')
        window.location.href='/login'
      }
    });
  })
}catch(error){
  alert('error!')
  window.location.href='/'
}
