import React from 'react'
import './CommonNotification.css'

const CommonNotification = ({notifyTitle, notifyBody, notifyColor}) => {
  return (
    <div className='commonNotification'>
      <div className="flex flex-col">
          <h2 style={{color: notifyColor}}>{notifyTitle}</h2>
          <h3 style={{color: notifyColor}}>{notifyBody}</h3>
      </div>
    </div>
  )
}

export default CommonNotification