import React from 'react'
import MsgList from '../../Components/MsgList/MsgList'
import MsgBox from '../../Components/MsgBox/MsgBox'

const Message = () => {
  return (
    <div className='flex mt-[-145px]'>
      <MsgList />
      <MsgBox />
    </div>
  )
}

export default Message