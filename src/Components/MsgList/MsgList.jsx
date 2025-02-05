import React, { useEffect, useState } from 'react'
import './MsgList.css'
import CommonUserProfile from '../CommonUserProfile/CommonUserProfile'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { setChatFriend } from '../../Slices/chatFriendSlice'

const MsgList = () => {
  // == Firebase Vars =>
  const db = getDatabase()
  // == Redux Vars =>
  const currentUser = useSelector((state) => state.User.value)
  const dispatch = useDispatch()
  // == State Vars =>
  const [friends, setFriends] = useState([])
  // == Functions =>
  useEffect(() => {
  onValue(ref(db, 'allFriends/'), (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
      if (item.val().friendId == currentUser.uid) {
          array.push({
              friendId: item.val().currentUserId,
              friendName: item.val().currentUserName,
              friendEmail: item.val().currentUserEmail,
              friendProfilePicture: item.val().currentUserProfilePicture,
              key: item.key
          })
      }
      if (item.val().currentUserId == currentUser.uid) {
          array.push({
              friendId: item.val().friendId,
              friendName: item.val().friendName,
              friendEmail: item.val().friendEmail,
              friendProfilePicture: item.val().friendProfilePicture,
              key: item.key
          })
      }
      })
      setFriends(array)
  })
  }, [])
  const handleFriendSelect = (friendData) => {
    dispatch(setChatFriend(friendData))
    localStorage.setItem("chatFriend", JSON.stringify(friendData))
  }
  return (
    <div className='msgList'>
      <h1 className='msgListTitle'>Your Friends</h1>
      <div className="msgListRow">
        {
          friends.map((friend, i) => (
            <div key={i} className="singleFriend" onClick={()=>handleFriendSelect(friend)}>
              <CommonUserProfile userName={friend.friendName} photoURL={friend.friendProfilePicture} email={friend.friendEmail} customColor={'#FFFFFF'} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MsgList