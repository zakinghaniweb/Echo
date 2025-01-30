import React from 'react'
import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdExit } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../Slices/userSlice';

const UserProfile = () => {
  // == Variables
  const currentUser = useSelector((state)=>state.User.value)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(currentUser)
  // == Functions
  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(clearUser())
    navigate('/login')
  }
  return (
    <div className='userProfile'>
      <div className="userCard">
        <div className="userCardBg"></div>
        <div className="userCardPfp">
          <img src={currentUser.photoURL?currentUser.photoURL:"https://th.bing.com/th/id/R.ff81cee4bc39b2c7a0511ab742c38b2e?rik=iEMDxyjiHJ5RRw&pid=ImgRaw&r=0"} alt="user" />
        </div>
        <h1>{currentUser.displayName}</h1>
        <h3>{currentUser.email}</h3>
        <button className='logout' onClick={handleLogout}>Logout<IoMdExit /></button>
      </div>
    </div>
  )
}

export default UserProfile