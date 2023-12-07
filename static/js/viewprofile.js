
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
try{
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            const userprofile = doc(db, "userprofile", uid);
            const users = doc(db, "users", uid);
            const up = await getDoc(userprofile);
            const u = await getDoc(users)
            const {name,char} = u.data();
            const {age,gender,major,mbti,hobby,features,socialmediaid,socialmediaidtype,smoke,introduction} =up.data()
            const hobbiesContainer = document.getElementById('hobbies');
            const traitsContainer = document.getElementById('traits');
            document.getElementById('title').textContent = name+"님의 정보"
            document.getElementById('name').textContent = name
            document.getElementById('charss').src = char
            document.getElementById('age').textContent = age
            document.getElementById('gender').textContent = gender
            document.getElementById('major').textContent = major
            document.getElementById('smoke').textContent = smoke
            document.getElementById('introduction').textContent = introduction
            document.getElementById('mbti').textContent = mbti[0]+mbti[1]+mbti[2]+mbti[3]
            document.getElementById('socialmediaidtype').textContent = socialmediaidtype
            document.getElementById('socialmediaid').textContent = socialmediaid
            hobby.forEach(function(hobbys) {
                var hobbyDiv = document.createElement('div');
                hobbyDiv.textContent = hobbys;
                hobbyDiv.id = 'hobby'
                hobbiesContainer.appendChild(hobbyDiv);
            });
            features.forEach(function(trait) {
                var traitDiv = document.createElement('div');
                traitDiv.textContent = trait;
                traitDiv.id = 'trait'
                traitsContainer.appendChild(traitDiv);
            });
        } else {
            console.log('not loggedin!')
            window.location.href='/login'
        }
    });
}catch(err){
    alert("에러 발생!")
    window.location.href='/'
}