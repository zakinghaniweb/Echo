import React from 'react'
import './CommonUserProfile.css'

const CommonUserProfile = ({userName, photoURL, email}) => {
  return (
    <div className='commonUserProfile'>
      <div className="userPfp">
          <img src={photoURL} alt="user" />
      </div>
      <div className="flex flex-col">
          <h2>{userName}</h2>
          <h3>{email}</h3>
      </div>
    </div>
  )
}

export default CommonUserProfile