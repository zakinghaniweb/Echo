import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Slide, toast } from 'react-toastify';

const ChangePassword = () => {
    // Firebase Vars
    const auth = getAuth();
    // State Vars
    const [email,setEmail] = useState('') 
    const [emailError,setEmailError] = useState('')
    // Functions
    const handlePasswordChange = (e)=>{
        e.preventDefault()
        if (!email) {
            setEmailError('Please Enter Your Email')
        } else {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.info('Password Reset Email Sent', {
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
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
                toast.error(errorCode, {
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
            });
        }
    }
  return (
    <div className='mainForm'>
        <div className="formBg">
            <div className="authForm !h-[500px]">
            <img className='leaf !bottom-[-233px]' src="leaf.png" alt="" />
            <h1>Forgot Password</h1>
            <p>Go back to <Link to={"/login"}>Log in</Link></p>
            <form onSubmit={handlePasswordChange}>
                <div className="input-group">
                <label htmlFor="email">Email</label>
                <input onChange={(e)=>{setEmail(e.target.value),setEmailError("")}} type="email" id='email'/>
                <h5 className='text-red-500 font-Poppins font-semibold mt-[10px]'>{emailError}</h5>
                </div>
                <button type='submit' className='authSubmit'>Send</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default ChangePassword