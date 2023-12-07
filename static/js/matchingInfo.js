
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
    await onAuthStateChanged(auth, async(user) => {
    if (user) {
        const ldoc= doc(db, "loveSubmitdata", uid);
        const lsubmit = (await getDoc(ldoc)).data() ?? undefined ;
        const fdoc= doc(db, "friendSubmitdata", uid);
        const fsubmit = (await getDoc(fdoc)).data() ?? undefined ;
        const gdoc= doc(db, "groupSubmitdata", uid);
        const gsubmit = (await getDoc(gdoc)).data() ?? undefined ;
        if(lsubmit){
            const hlist = lsubmit.wishhobby
            const wishhobby = hlist.join(', ');
            const flist = lsubmit.wishfeatures
            const wishfeatures = flist.join(', ');
            document.getElementById("lage").textContent = lsubmit.wishage
            document.getElementById("lsmoke").textContent = lsubmit.wishsmoke
            document.getElementById("lmbti").textContent = lsubmit.wishmbti[0]+lsubmit.wishmbti[1]+lsubmit.wishmbti[2]+lsubmit.wishmbti[3]
            document.getElementById("lgender").textContent = lsubmit.wishgender
            document.getElementById("lhobby").textContent = wishhobby
            document.getElementById("lfeatures").textContent = wishfeatures
        }
        if(fsubmit){
            const hlist = fsubmit.wishhobby
            const wishhobby = hlist.join(', ');
            const flist = fsubmit.wishfeatures
            const wishfeatures = flist.join(', ');
            document.getElementById("fage").textContent = fsubmit.wishage
            document.getElementById("fsmoke").textContent = fsubmit.wishsmoke
            document.getElementById("fmbti").textContent = fsubmit.wishmbti[0]+fsubmit.wishmbti[1]+fsubmit.wishmbti[2]+fsubmit.wishmbti[3]
            document.getElementById("fgender").textContent = fsubmit.wishgender
            document.getElementById("fhobby").textContent = wishhobby
            document.getElementById("ffeatures").textContent = wishfeatures
        }
        if(gsubmit){
            document.getElementById("gcount").textContent = gsubmit.wishcount
            document.getElementById("gage").textContent = gsubmit.wishage
            document.getElementById("gdeletemajor").textContent = gsubmit.deletemajor
            document.getElementById("gidtype").textContent = gsubmit.socialmediaidtype+" : "+gsubmit.socialmediaid
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
