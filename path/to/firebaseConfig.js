// firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDtifOP8pjavkq5Hd7uDFcRYg8vynwGWpE',
  authDomain: 'react-login-e0fe4.firebaseapp.com',
  projectId: 'react-login-e0fe4',
  storageBucket: 'react-login-e0fe4.appspot.com',
  messagingSenderId: '162894457303',
  appId: '1:162894457303:web:51b8b33aca82fb0f630392',
}

// 初始化 Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
