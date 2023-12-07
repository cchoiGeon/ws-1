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
                const userdoc = doc(db, "users", uid);
                const udoc = await getDoc(userdoc);
                const isverify = udoc.data().verify
                if(isverify  == 'false' || isverify  == 'processing'){
                    window.location.href = '/verify'
                }
                const alreadysubmit = (await getDoc(doc(db, "groupSubmitdata", uid))).data() ?? undefined;
                const statuslist = udoc.data().statusList
                document.getElementById("subbutton").addEventListener('click',async(e)=>{
                    e.preventDefault()
                    const wishage = document.getElementById('wishage').value
                    const deletemajor = document.getElementById('deletemajor').value
                    const aloneCheckbox = document.getElementById('alone');
                    const togetherCheckbox = document.getElementById('together');
                    let wishcount = ''; 
                    if(aloneCheckbox.checked){
                        wishcount = aloneCheckbox.value
                    }if(togetherCheckbox.checked){
                        wishcount = togetherCheckbox.value
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
                    const groupProfile = doc(db, "groupSubmitdata",uid);
                    if(wishcount == '혼자'){
                        await setDoc(groupProfile, {
                            wishage,
                            wishcount,
                            deletemajor,
                            name:udoc.data().name,
                            major,
                            age,
                            socialmediaid,
                            socialmediaidtype,
                            ismatched:false,
                        });
                        const groupProfileDocRef = doc(db, "groupSubmit", wishcount, gender + "사용자", uid);
                        await setDoc(groupProfileDocRef, {
                            wishage,
                            wishcount,
                            deletemajor,
                            name:udoc.data().name,
                            major,
                            age,
                            socialmediaid,
                            socialmediaidtype,
                            ismatched:false,
                        });
                        const userProfileDocRef = doc(db, "groupSubmit", wishcount , "userprofile", uid);
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
                        const users = doc(db, "users", uid);
                        if(!alreadysubmit){
                            await updateDoc(users, {
                                statusList:[statuslist[0]+1,statuslist[1]+1,statuslist[2]]
                            });
                        }
                        window.location.href='/gmatching-finish'
                    }else{ // 친구
                    const name1 = document.getElementById('name1').value
                    const name2 = document.getElementById('name2').value
                    const name3 = document.getElementById('name3').value
                    const age1 = document.getElementById('age1').value
                    const age2 = document.getElementById('age2').value
                    const age3 = document.getElementById('age3').value
                    const major1 = document.getElementById('major1').value
                    const major2 = document.getElementById('major2').value
                    const major3 = document.getElementById('major3').value
                        await setDoc(groupProfile, {
                            wishage,
                            wishcount,
                            deletemajor,
                            name1,
                            major1,
                            age1,
                            name2,
                            major2,
                            age2,
                            name3,
                            major3,
                            age3,
                            socialmediaid,
                            socialmediaidtype,
                            ismatched:false,
                        });
                        const groupProfileDocRef = doc(db, "groupSubmit",  wishcount, gender + "사용자", uid);
                        await setDoc(groupProfileDocRef, {
                            wishage,
                            wishcount,
                            deletemajor,
                            name1,
                            major1,
                            age1,
                            name2,
                            major2,
                            age2,
                            name3,
                            major3,
                            age3,
                            socialmediaid,
                            socialmediaidtype,
                            ismatched:false,
                        });
                        const userProfileDocRef = doc(db, "groupSubmit", wishcount , "userprofile", uid);
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
                            const userss = doc(db, "users", uid);
                            await updateDoc(userss, {
                                statusList:[statuslist[0]+1,statuslist[1]+1,statuslist[2]]
                            });
                        }
                        window.location.href='/gmatching-finish'
                    }
                });
            }catch(err){
                alert('다시 설정해주세요.')
                window.location.href='/groupmatching'
            }