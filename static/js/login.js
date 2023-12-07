
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
        import { getAuth ,signInWithEmailAndPassword, getIdToken,setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
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

        document.getElementById("subbutton").addEventListener('click',async(e)=>{
        e.preventDefault()
        const email = document.getElementById('subemail').value
        const password = document.getElementById('subpassword').value
        try{
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                        function setCookie(name, value, days) {
                                const expires = new Date();
                                expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
                                document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
                        }
                        setCookie('uid', userCredential.user.uid, 7);
                })
                .then(()=>{
                        window.location.href='/'
                })
                .catch((err) => {
                        if(err.code==='auth/invalid-login-credentials'){
                                alert('이메일과 비밀번호를 확인해주세요.')
                                window.location.href='/login'
                        }else{
                                alert('다시 시도해주세요.')
                                window.location.href='/login'
                        }
                });
        }catch(err){
                if (err.code === 'auth/invalid-login-credentials'){
                        alert('아이디와 비밀번호를 확인해주세요.')
                }else{
                        alert('로그인을 다시 해주세요.')
                }
                window.location.href='/login'
        }
})