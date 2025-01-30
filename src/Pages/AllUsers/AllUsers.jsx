import React, { useEffect, useState } from 'react'
import './AllUsers.css'
import CommonUserProfile from '../../Components/CommonUserProfile/CommonUserProfile'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database"
import ButtonV1 from '../../Components/ButtonV1/ButtonV1'

const AllUsers = () => {
  // == State Vars
  const [users, setUsers] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [receivedRequests, setReceivedRequests] = useState([])
  // == Redux Vars
  const currentUser = useSelector((state) => state.User.value)
  // == Firebase Vars
  const db = getDatabase()
  // == Functions
  useEffect(() => {
    onValue(ref(db, 'allUsers/'), (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        if (item.key != currentUser.uid) {
          array.push({ ...item.val(), id: item.key })
        }
      })
      setUsers(array)
    })
  }, [])
  useEffect(() => {
    onValue(ref(db, 'allRequest/'), (snapshot) => {
      let array = []
      let array2 = []
      snapshot.forEach((item) => {
        if (item.val().senderId == currentUser.uid && item.val().requestStatus == 'pending') {
          array[item.val().receiverId] = item.key
        }
        if (item.val().receiverId == currentUser.uid && item.val().requestStatus == 'pending') {
          array2[item.val().senderId] = item.key;
        }
      })
      setSentRequests(array)
      setReceivedRequests(array2)
    })
  }, [])
  // Send Request (Karo kache request send korar jonne)
  const handleSendRequest = (user) => {
    const newRequestRef = push(ref(db, 'allRequest/'))
    set(newRequestRef, {
      senderName: currentUser.displayName,
      senderEmail: currentUser.email,
      senderProfilePicture: currentUser.photoURL,
      senderId: currentUser.uid,
      receiverId: user.id,
      receiverName: user.userName,
      receiverEmail: user.email,
      receiverProfilePicture: user.profilePicture,
      requestStatus: 'pending',
    })
    setSentRequests((prev)=>({ ...prev, [user.id]: newRequestRef.key }))
  }
  // Cancel Request (Nijer request cancel kore dibe)
  const handleCancelRequest = (userId) => {
    if (sentRequests[userId]) {
      remove(ref(db,'allRequest/' + sentRequests[userId]))
      setSentRequests((prev) => {
        delete {...prev}[userId]
        return prev
      })
    }
  }
  // Reject Request (Onno joner request cancel kore dibe)
  const handleRejectRequest = (userId) => {
    if (receivedRequests[userId]) {
      remove(ref(db,'allRequest/' + receivedRequests[userId]))
      setReceivedRequests((prev) => {
        delete {...prev}[userId]
        return prev
      })
    }
  }
  // Confirm Request (Karo request accept korar jonne)
  const handleConfirmRequest = (user) => {
    if (receivedRequests[user.id]) {
      remove(ref(db,'allRequest/' + receivedRequests[user.id]))
      setReceivedRequests((prev) => {
        delete {...prev}[user.id]
        return prev
      })
      set(push(ref(db, 'allFriends/')), {
        friendEmail: user.email,
        friendName: user.userName,
        friendProfilePicture: user.profilePicture,
        friendId: user.id,
        friendOf: currentUser.uid
      })
    }
  }
  console.log(receivedRequests)
  return (
    <div>
        <div className="container">
          <div className="allUsersBg">
            <h1 className='allUsersTitle'>All Users</h1>
            <div className="allUsersRow">
              {
                users.map((user, i)=>{
                  return (
                    <div className='w-full flex justify-between items-center' key={i}>
                      <CommonUserProfile userName={user.userName} photoURL={user.profilePicture} email={user.email} />
                      {
                        receivedRequests[user.id] ? (
                        <div className='flex gap-[10px]'>
                          <ButtonV1 buttonV1Text='Confirm' buttonV1Color='text-[#fff]' buttonV1Bg='bg-[#17a2b8]' buttonV1Click={()=>handleConfirmRequest(user)} />
                          <ButtonV1 buttonV1Text='Reject' buttonV1Color='text-[#fff]' buttonV1Bg='bg-red-500' buttonV1Click={()=>handleRejectRequest(user.id)} />
                        </div>
                        ) : (
                        sentRequests[user.id] ? 
                          <ButtonV1 buttonV1Text='Cancel' buttonV1Color='text-[#fff]' buttonV1Bg='bg-red-500' buttonV1Click={()=>handleCancelRequest(user.id)} />
                          :
                          <ButtonV1 buttonV1Text='Add Friend' buttonV1Color='text-[#fff]' buttonV1Bg='bg-[#17a2b8]' buttonV1Click={()=>handleSendRequest(user)} />
                        )
                      }
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

export default AllUsers