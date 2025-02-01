import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CommonUserProfile from '../../Components/CommonUserProfile/CommonUserProfile'
import ButtonV1 from '../../Components/ButtonV1/ButtonV1'

const MyFriends = () => {
    // == State Vars =>
    const [friends, setFriends] = useState([])
    // == Redux Vars =>
    const currentUser = useSelector((state) => state.User.value)
    // == Firebase Vars =>
    const db = getDatabase()
    // == Funtions =>
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
    const handleBlock = (friendData) => {
        set(push(ref(db, 'blockList/')), {
            blockFriendEmail: friendData.friendEmail,
            blockFriendName: friendData.friendName,
            blockFriendProfilePicture: friendData.friendProfilePicture,
            blockFriendId: friendData.friendId,
            currentUserId: currentUser.uid,
        })
        set(push(ref(db, 'allNotifications/')), {
            notifySenderId: currentUser.uid,
            notifyMessage: "You were blocked by: " + currentUser.displayName,
            notifyReceiverId: friendData.friendId,
            notifyMessageCol: "#Ff0000",
            notifyType: "Block"
        })
        remove(ref(db, 'allFriends/' + friendData.key))
    }
    const handleUnfriend = (FriendId)=>{
        remove(ref(db, 'allFriends/' + FriendId))
    }
  return (
    <div>
        <div className="container">
            <div className="allUsersBg">
            <h1 className='allUsersTitle'>All Users</h1>
            <div className="allUsersRow">
                {
                friends.map((user, i)=>{
                    return (
                    <div className='w-full flex justify-between items-center' key={i}>
                        <CommonUserProfile userName={user.friendName} photoURL={user.friendProfilePicture} email={user.friendEmail} />
                        <div className='flex gap-[10px]'>
                            <ButtonV1 buttonV1Text='Block' buttonV1Color='text-[#fff]' buttonV1Bg='bg-red-500' buttonV1Click={()=>handleBlock(user)} />
                            <ButtonV1 buttonV1Text='Unfriend' buttonV1Color='text-[#fff]' buttonV1Bg='bg-gray-500' buttonV1Click={()=>handleUnfriend(user.key)} />
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

export default MyFriends