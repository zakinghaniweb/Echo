import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { Slide, toast } from 'react-toastify'
import { userData } from '../../Slices/userSlice';


const Login = () => {
    // == State Vars
    const [loginData,setLoginData] = useState({email: "",password: ""})
    const [loginError,setLoginError] = useState({emailError: "",passwordError: ""})
    const [loading,setLoading] = useState(false)
    // == Redux Vars
    const currentUser = useSelector((state)=>state.User.value);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // == Firebase Vars
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const db = getDatabase();
    // == Functions
    const handleLogin = (e)=>{
        e.preventDefault()
        if (!loginData.email) {
          setLoginError((prev)=>({...prev,emailError:'Please Enter Your Email'}))
        }
        else if(!loginData.password){
          setLoginError((prev)=>({...prev,passwordError:'Please Enter Your Password'}))
        }
        else{
            setLoading(true)
            signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((userCredential) => {
              const user = userCredential.user;
              if (!user.emailVerified) {
                toast.error('Email is not verified', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                  });
                  setLoading(false)
              } else {
                setLoading(false)
                navigate('/home')
                toast.success('Login Successful', {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Slide,
                });
                localStorage.setItem('user',JSON.stringify(user))
                dispatch(userData(user))
                set(ref(db, 'allUsers/' + user.uid), {
                  userName: user.displayName,
                  email: user.email,
                  profilePicture : user.photoURL
                });
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode === 'auth/invalid-credential') {
                setLoginError((prev)=>({...prev,passwordError:'Something Went Wrong'}))
              }
              setLoading(false)
            });
        }
    }
    const handleGoogleLogin = (e)=>{
      setLoading(true)
      e.preventDefault()
      signInWithPopup(auth, provider)
      .then((result) => {
        setLoading(false)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toast.success('Login Successful', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        localStorage.setItem('user',JSON.stringify(user))
        navigate('/home')
      }).catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode)
      });
    }
  return (
    <div className='mainForm'>
        <div className="formBg">
            <div className="authForm !h-[800px]">
              <img className='leaf !bottom-[-80px]' src="leaf.png" alt="" />
              <h1>Login</h1>
              <p>Don't have an account ? <Link to={'/'}>Sign Up</Link></p>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input onChange={(e)=>{setLoginData((prev)=>({...prev,email:e.target.value})),setLoginError((prev)=>({...prev,emailError:''}))}} type="email" id='email'/>
                  <h5 className='text-red-500 font-Poppins font-semibold mt-[10px]'>{loginError.emailError}</h5>
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input onChange={(e)=>{setLoginData((prev)=>({...prev,password:e.target.value})),setLoginError((prev)=>({...prev,passwordError:''}))}} type="password" id='password'/>
                  <h5 className='text-red-500 font-Poppins font-semibold mt-[10px]'>{loginError.passwordError}</h5>
                  <Link to={'/changePassword'} className='text-white text-end block font-Poppins font-semibold mt-[10px]'>Forgot Password?</Link>
                </div>
                {
                  loading?
                  <button type='submit' className='authSubmit' disabled><PulseLoader color='#696969' /></button>
                  :
                  <button type='submit' className='authSubmit'>Log In</button>
                }
              </form>
              <h4 className="otherOption">Or Sign In with</h4>
              <div className="otherOptionBtn">
                <button onClick={handleGoogleLogin}><img src="google.png" alt="google" /></button>
                <button><img src="apple.png" alt="apple" /></button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login