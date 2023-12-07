            // Import the functions you need from the SDKs you need
            import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
            import { getAuth ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
            import { getFirestore, doc, updateDoc ,setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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
                document.getElementById("subbutton").addEventListener('click',async(e)=>{
                    e.preventDefault()
                    const age = document.getElementById('age').value
                    const gender = document.getElementById('gender').value
                    const major = document.getElementById('major').value
                    const smoke = document.getElementById('smoke').value
                    const socialmediaid = document.getElementById('socialmediaid').value
                    const socialmediaidtype = document.getElementById('socialmediaidtype').value
                    const introduction = document.getElementById('inputPassword').value
                    const charlist = document.getElementsByName('char');
                    const mbtilist = document.getElementsByName('mbti');
                    const hobbylist = document.getElementsByName('hobby');
                    const featureslist = document.getElementsByName('features');
                    const char = [];
                    const mbti = [];
                    const hobby = [];
                    const features = [];
                    for (const checkbox of charlist) {
                        if (checkbox.checked) {
                            char.push(checkbox.value);
                        }
                    }
                    for (const checkbox of hobbylist) {
                        if (checkbox.checked) {
                            hobby.push(checkbox.value);
                        }
                    }
                    for (const checkbox of mbtilist) {
                        if (checkbox.checked) {
                            mbti.push(checkbox.value);
                        }
                    }
                    for (const checkbox of featureslist) {
                        if (checkbox.checked) {
                            features.push(checkbox.value);
                        }
                    }
                    await onAuthStateChanged(auth, async(user) => {
                        if (user) {
                            await setDoc(doc(db, "userprofile", uid), {
                                age,
                                gender,
                                major,
                                smoke,
                                socialmediaid,
                                socialmediaidtype,
                                mbti,
                                hobby,
                                features,
                                introduction,
                                ismatched:false,
                            });
                            await updateDoc(doc(db, "users", uid),{
                                myprofileset:'true',
                                char:char[0],
                                major,
                            });
                            window.location.href='/myprofile'
                        } else {
                            window.location.href='/login'
                        }
                    });
                })
            }catch(err){
                alert("에러 발생")
                window.location.href='/'
            }