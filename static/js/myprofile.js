
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
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            const {char,name,verify,statusList} =docSnap.data()
            document.getElementById('name').textContent = name
            document.getElementById('charss').src = char
            document.getElementById('applyNum').textContent = statusList[0]
            document.getElementById('onNum').textContent = statusList[1]
            document.getElementById('completeNum').textContent = statusList[2]
            if(verify === 'false'){
                const verifyElement = document.getElementById("verify");
                const pElement = document.createElement("p");
                pElement.textContent = "학생증 인증 여부 : 미완료";

                // <a> 요소 생성 및 설정ㅌ₩
                const aElement = document.createElement("a");
                aElement.href = "/verify";
                aElement.textContent = "인증하기";

                // <p> 및 <a> 요소를 <div>에 추가
                verifyElement.appendChild(pElement);
                verifyElement.appendChild(aElement);
            }else if(verify === 'processing'){
                const verifyElement = document.getElementById("verify");
                const pElement = document.createElement("p");
                pElement.textContent = "학생증 인증 여부 : 확인중";

                // <a> 요소 생성 및 설정ㅌ₩
                const aElement = document.createElement("a");
                aElement.href = "/verify";
                aElement.textContent = "수정하기";

                // <p> 및 <a> 요소를 <div>에 추가
                verifyElement.appendChild(pElement);
                verifyElement.appendChild(aElement);
            }else{
                const verifyElement = document.getElementById("verify");
                const pElement = document.createElement("p");
                pElement.textContent = "학생증 인증 여부 : 완료";
                // <p> 및 <a> 요소를 <div>에 추가
                verifyElement.appendChild(pElement);
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
    