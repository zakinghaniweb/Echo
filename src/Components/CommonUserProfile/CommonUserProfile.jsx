import React from 'react'
import './CommonUserProfile.css'

const CommonUserProfile = ({userName, photoURL, email, customColor}) => {
  return (
    <div className='commonUserProfile'>
      <div className="userPfp">
          <img src={photoURL} alt="user" />
      </div>
      <div className="flex flex-col">
          <h2 style={{color: customColor || '#252525'}}>{userName}</h2>
          <h3 style={{color: customColor || '#484848'}}>{email}</h3>
      </div>
    </div>
  )
}

export default CommonUserProfile