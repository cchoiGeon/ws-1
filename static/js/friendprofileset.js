            // Import the functions you need from the SDKs you need
            import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
            import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
            import { getFirestore, getDoc, doc, updateDoc ,setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
    
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
            try{
                const uid = getCookie('uid');
                const users = doc(db, "users", uid);
                const udoc = await getDoc(users);
                const a = udoc.data().verify
                if(a == 'false' || a == 'processing'){
                    window.location.href = '/verify'
                }
                const alreadysubmit = (await getDoc(doc(db, "friendSubmitdata", uid))).data() ?? undefined;
                const statuslist = udoc.data().statusList
                document.getElementById("subbutton").addEventListener('click',async(e)=>{
                    e.preventDefault()
                    const wishage = document.getElementById('wishage').value
                    const genderlist = document.getElementsByName('wishgender')
                    const smokelist = document.getElementsByName('wishsmoke')
                    const mbtilist = document.getElementsByName('wishmbti');
                    const hobbylist = document.getElementsByName('wishhobby');
                    const featureslist = document.getElementsByName('wishfeatures');
                    const wishgender = [];
                    const wishsmoke = [];
                    const wishmbti = [];
                    const wishhobby = [];
                    const wishfeatures = [];
                    for (const checkbox of smokelist) {
                        if (checkbox.checked) {
                            wishsmoke.push(checkbox.value);
                        }
                    }
                    for (const checkbox of genderlist) {
                        if (checkbox.checked) {
                            wishgender.push(checkbox.value);
                        }
                    }
                    for (const checkbox of hobbylist) {
                        if (checkbox.checked) {
                            wishhobby.push(checkbox.value);
                        }
                    }
                    for (const checkbox of mbtilist) {
                        if (checkbox.checked) {
                            wishmbti.push(checkbox.value);
                        }
                    }
                    for (const checkbox of featureslist) {
                        if (checkbox.checked) {
                            wishfeatures.push(checkbox.value);
                        }
                    }
                    const userdoc = doc(db, "userprofile", uid);
                    // userprofile 문서를 가져옵니다.
                    const updoc = await getDoc(userdoc);
                    const {age,
                        gender,
                        major,
                        smoke,
                        socialmediaid,
                        socialmediaidtype,
                        mbti,
                        hobby,
                        features,
                        introduction} = updoc.data()
                    const loveProfile = doc(db, "friendSubmitdata",uid);
                    await setDoc(loveProfile, {
                        wishage,
                        wishgender:wishgender[0],
                        wishsmoke:wishsmoke[0],
                        wishmbti,
                        wishhobby,
                        wishfeatures,
                        ismatched:false,
                    });
                    const loveProfileDocRef = doc(db, "friendSubmit", gender + "사용자", wishgender[0], uid);
                    await setDoc(loveProfileDocRef, {
                        wishage,
                        wishgender:wishgender[0],
                        wishsmoke:wishsmoke[0],
                        wishmbti,
                        wishhobby,
                        wishfeatures,
                        ismatched:false,
                    });
                    const userProfileDocRef = doc(db, "friendSubmit", gender + "사용자", "userprofile", uid);
                    await setDoc(userProfileDocRef, {
                        age,
                        gender,
                        major,
                        smoke,
                        socialmediaid,
                        socialmediaidtype,
                        mbti,
                        hobby,
                        features,
                        introduction
                    });
                    if(!alreadysubmit){
                        await updateDoc(users, {
                            statusList:[statuslist[0]+1,statuslist[1]+1,statuslist[2]]
                        });
                    }
                    window.location.href='/fmatching-finish'
                });
            }catch(err){
                alert('다시 설정해주세요.')
                window.location.href='/friendmatching'
            }