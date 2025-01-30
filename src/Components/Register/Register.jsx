import React, { useState } from 'react'
import './Register.css'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Slide, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const Register = () => {
  // == State Vars
  const [registerData,setRegisterData] = useState({userName:'',email:'',password:''})
  const [registerError,setRegisterError] = useState({nameError:'',emailError:'',passwordError:''})
  const [loading,setLoading] = useState(false)
  // == Firebase Vars
  const auth = getAuth();
  // Other Vars
  const navigate = useNavigate()
  // == Functions
  const handleRegister = (e)=>{
    e.preventDefault()
    if (!registerData.userName) {
      setRegisterError((prev)=>({...prev,nameError:'Please Enter Your Name'}))
    }
    else if (!registerData.email) {
      setRegisterError((prev)=>({...prev,emailError:'Please Enter Your Email'}))
    }
    else if (!registerData.password) {
      setRegisterError((prev)=>({...prev,passwordError:'Please Enter Your Password'}))
    }
    else{
      setLoading(true)
      createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: registerData.userName,
          photoURL: "https://th.bing.com/th/id/R.ff81cee4bc39b2c7a0511ab742c38b2e?rik=iEMDxyjiHJ5RRw&pid=ImgRaw&r=0",
        }).then(() => {
          sendEmailVerification(auth.currentUser)
          .then(() => {          
            toast.info('Email Verification Sent', {
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
            navigate('/login')
          });
        }).catch((error) => {
          setLoading(false)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          toast.error('Email is already used', {
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
        }
        if (errorCode == "auth/weak-password") {
          toast.error('Enter a strong password', {
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
        }
        setLoading(false)
      });
    }
  }
  return (
    <div className='mainForm'>
        <div className="formBg">
            <div className="authForm">
              <img className='leaf' src="leaf.png" alt="" />
              <h1>Get Started</h1>
              <p>Already have an Account ? <Link to={"/login"}>Log in</Link></p>
              <form onSubmit={handleRegister}>
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input onChange={(e)=>{setRegisterData((prev)=>({...prev,userName:e.target.value})),setRegisterError((prev)=>({...prev,nameError:''}))}} type="text" id='name'/>
                  <h5 className='text-red-500 font-Poppins font-semibold mt-[10px]'>{registerError.nameError}</h5>
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input onChange={(e)=>{setRegisterData((prev)=>({...prev,email:e.target.value})),setRegisterError((prev)=>({...prev,emailError:''}))}} type="email" id='email'/>
                  <h5 className='text-red-500 font-Poppins font-semibold mt-[10px]'>{registerError.emailError}</h5>
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input onChange={(e)=>{setRegisterData((prev)=>({...prev,password:e.target.value})),setRegisterError((prev)=>({...prev,passwordError:''}))}} type="password" id='password'/>
                  <h5 className='text-red-500 font-Poppins font-semibold mt-[10px]'>{registerError.passwordError}</h5>
                </div>
                {
                  loading?
                  <button type='submit' className='authSubmit' disabled><PulseLoader color='#696969' /></button>
                  :
                  <button type='submit' className='authSubmit'>Sign Up</button>
                }
              </form>
              <h4 className="otherOption">Or Sign Up with</h4>
              <div className="otherOptionBtn">
                <button><img src="google.png" alt="google" /></button>
                <button><img src="apple.png" alt="apple" /></button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Register