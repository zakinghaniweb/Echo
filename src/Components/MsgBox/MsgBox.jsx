import React, { useEffect, useRef, useState } from 'react'
import './MsgBox.css'
import EmojiPicker from 'emoji-picker-react'
import { MdEmojiEmotions } from 'react-icons/md'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { FaPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const MsgBox = () => {
  // == Firebase Vars =>
  const db = getDatabase()
  // == Redux Vars =>
  const currentFriend = useSelector((state) => state.currentFriend.value)
  const currentUser = useSelector((state) => state.User.value)
  // == State Vars =>
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message,setMessage] = useState('')
  const [allMessages,setAllMessages] = useState([])
  const pickerRef = useRef(null)
  // == Functions =>
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji)
  }
  const handleSendMessage = (e)=>{
    e.preventDefault()
    setShowEmojiPicker(false)
    setMessage("")
    if(currentFriend){
      if (message != "") {        
        set(push(ref(db, 'allMessages/')), {
          senderId: currentUser.uid,
          receiverId: currentFriend?.friendId,
          message: message
        });
      }
    }
  }
  useEffect(()=>{
    onValue(ref(db, 'allMessages/'), (snapshot) => {
      let array = []
      snapshot.forEach((item)=>{
        if(item.val().senderId == currentFriend.friendId && item.val().receiverId == currentUser.uid){
          array.push(item.val())
        }
        if (item.val().senderId == currentUser.uid && item.val().receiverId == currentFriend.friendId) {
          array.push(item.val())
        }
      })
      setAllMessages(array)
    })
  },[currentFriend])
  return (
    <div className='msgBox'>
      <div className="friendInfo">
        <div className="userPfp">
          <img src={currentFriend?.friendProfilePicture} alt="" />
        </div>
        <div className="flex flex-col">
          <h2>{currentFriend?.friendName}</h2>
          <h3>{currentFriend?.friendEmail}</h3>
        </div>
      </div>
      <div className="msgShow">
        <div className="msgCol">
          {
            allMessages.map((msg,i)=>(
              msg.senderId == currentUser.uid?
              <div key={i} className="singleMsg">
                <p>{msg.message}</p>
              </div>
              :
              <div key={i} className="friendMsg">
                <p>{msg.message}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className="msgSendInput">
        <form onSubmit={handleSendMessage}>
          <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder='Type a message' />
          <button type='submit' className='sendMessage'>
            Send
            <FaPaperPlane />
          </button>
          <span className='emojiToggle' onClick={()=>setShowEmojiPicker(!showEmojiPicker)}>
            <MdEmojiEmotions />
          </span>
          {
            showEmojiPicker&&
            <div className="emoji-picker" ref={pickerRef}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          }
        </form>
      </div>
    </div>
  )
}

export default MsgBox