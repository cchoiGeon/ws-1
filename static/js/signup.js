// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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
try{
    document.getElementById('subbutton').addEventListener('click',async (e)=>{
        e.preventDefault()
        const email = document.getElementById('subemail').value
        const password = document.getElementById('subpassword').value
        const checkpassword = document.getElementById('checkpassword').value
        const name = document.getElementById('subname').value
        const studentnum = document.getElementById('substudentnum').value
        function setCookie(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
        }
        if(checkpassword != password){
            window.alert('비밀번호를 확인해주세요')
            window.location.href='/signup'
        }
        alert('진행 중입니다. 확인 버튼을 누르신 후 잠시동안 기다려주세요.')
        createUserWithEmailAndPassword(auth,email,password)
        .then(async (userCredential)=>{
            const uid = userCredential.user.uid
            setCookie('uid', uid, 7);
            await setDoc(doc(db, "users", uid), {
                char:'false',
                email,
                major:'false',
                name,
                statusList:[0,0,0],
                studentnum,
                uid,
                myprofileset:'false',
                verify:'false',
                verifyurl:'false',
            })
        })
        .then(()=>{
            window.location.href='/welcome'  
        })

    })
}
    catch(err){
    if(err.code ==='auth/email-already-in-use'){
        alert('이미 사용중인 이메일입니다.')
        window.location.href='/signup'
    }else{
        alert('에러/ 다시 시도해주세요.')
        window.location.href='/signup'
    }
}