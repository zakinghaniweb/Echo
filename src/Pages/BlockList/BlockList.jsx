import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ButtonV1 from '../../Components/ButtonV1/ButtonV1'
import CommonUserProfile from '../../Components/CommonUserProfile/CommonUserProfile'


const BlockList = () => {
  // == Firebase Vars
  const db = getDatabase()
  // == State Vars
  const [blockedUsers, setBlockedUsers] = useState([])
  // == Redux Vars
  const currentUser = useSelector((state) => state.User.value)
  // == Functions
  useEffect(() => {
    onValue(ref(db, 'blockList/'), (snapshot) => {
        let array = []
        snapshot.forEach((item) => {
        if (item.val().currentUserId == currentUser.uid) {
            array.push({
              ...item.val(),
              key: item.key
            })
        }
        })
        setBlockedUsers(array)
    })
  },[])
  const handleUnBlock = (friendData)=>{
    set(push(ref(db, 'allFriends/')), {
      friendEmail: friendData.blockFriendEmail,
      friendName: friendData.blockFriendName,
      friendProfilePicture: friendData.blockFriendProfilePicture,
      friendId: friendData.blockFriendId,
      currentUserId: currentUser.uid,
      currentUserName: currentUser.displayName,
      currentUserEmail: currentUser.email,
      currentUserProfilePicture: currentUser.photoURL
    })
    set(push(ref(db, 'allNotifications/')), {
      notifySenderId: currentUser.uid,
      notifyMessage: "You were unblocked by: " + currentUser.displayName,
      notifyReceiverId: friendData.blockFriendId,
      notifyMessageCol: "#013220",
      notifyType: "Unblock"
    })
    remove(ref(db, 'blockList/' + friendData.key))
  }
  const handleUnfriend = (blockedFriend)=>{
    set(push(ref(db, 'allNotifications/')), {
      notifySenderId: currentUser.uid,
      notifyMessage: "You were unfriend by: " + currentUser.displayName,
      notifyReceiverId: blockedFriend.blockFriendId,
      notifyMessageCol: "#FF0000",
      notifyType: "Unfriend"
    })
    remove(ref(db, 'blockList/' + blockedFriend.key))
  }
  return (
    <div>
        <div className="container">
            <div className="allUsersBg">
            <h1 className='allUsersTitle'>All Users</h1>
            <div className="allUsersRow">
                {
                blockedUsers.map((user, i)=>{
                    return (
                    <div className='w-full flex justify-between items-center' key={i}>
                        <CommonUserProfile userName={user.blockFriendName} photoURL={user.blockFriendProfilePicture} email={user.blockFriendEmail} />
                        <div className='flex gap-[10px]'>
                            <ButtonV1 buttonV1Text='Unblock' buttonV1Color='text-[#fff]' buttonV1Bg='bg-red-500' buttonV1Click={()=>handleUnBlock(user)} />
                            <ButtonV1 buttonV1Text='Unfriend' buttonV1Color='text-[#fff]' buttonV1Bg='bg-gray-500' buttonV1Click={()=>handleUnfriend(user)} />
                        </div>
                    </div>
                    )
                })
                }
            </div>
            </div>
        </div>
    </div>
  )
}

export default BlockList