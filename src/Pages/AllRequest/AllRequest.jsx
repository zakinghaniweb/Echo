import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import CommonUserProfile from '../../Components/CommonUserProfile/CommonUserProfile';
import ButtonV1 from '../../Components/ButtonV1/ButtonV1';

const AllRequest = () => {
    // == State Vars
    const [request, setRequest] = useState([]);
    const [myRequest, setMyRequest] = useState([]);
    // == Redux Vars
    const currentUser = useSelector((state)=>state.User.value);
    // == Firebase Vars
    const db = getDatabase()
    // == Functions
    useEffect(()=>{
      onValue(ref(db, 'allRequest/'), (snapshot) => {
          let array = []
          let array2 = []
          snapshot.forEach((item) => {
              if (item.val().receiverId == currentUser.uid) {
                array.push({...item.val(), id: item.key})
              }
              if (item.val().senderId == currentUser.uid) {
                array2.push({...item.val(), id: item.key})
              }
          })
          setRequest(array)
          setMyRequest(array2)
      });
    },[])
    const handleCancelRequest = (requestId) => {
      remove(ref(db, 'allRequest/' + requestId));
    }
  return (
    <div>
        <div className="container">
          <div className="allUsersBg">
            <h1 className='allUsersTitle'>All Requests</h1>
            <div className="allUsersRow">
              {
                request.map((user, i)=>{
                  return (
                    <div className='w-full flex justify-between items-center'>
                      <CommonUserProfile key={i} userName={user.senderName} photoURL={user.senderProfilePicture} email={user.senderEmail} />
                      <div className='flex gap-[10px]'>
                        <ButtonV1 buttonV1Text='Confirm' buttonV1Color='text-[#fff]' buttonV1Bg='bg-[#28a745]' buttonV1Click={()=>handleSendRequest(user.id)} />
                        <ButtonV1 buttonV1Text='Reject' buttonV1Color='text-[#fff]' buttonV1Bg='bg-red-500' buttonV1Click={()=>handleSendRequest(user.id)} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="allUsersBg mt-[50px]">
            <h1 className='allUsersTitle'>My Requests</h1>
            <div className="allUsersRow">
              {
                myRequest.map((user, i)=>{
                  return (
                    <div className='w-full flex justify-between items-center'>
                      <CommonUserProfile key={i} userName={user.receiverName} photoURL={user.receiverProfilePicture} email={user.receiverEmail} />
                      <ButtonV1 buttonV1Text='Cancel' buttonV1Color='text-[#fff]' buttonV1Bg='bg-red-500' buttonV1Click={()=>handleCancelRequest(user.id)} />
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

export default AllRequest