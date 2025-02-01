import React, { useEffect, useState } from 'react'
import ButtonV1 from '../../Components/ButtonV1/ButtonV1'
import CommonUserProfile from '../../Components/CommonUserProfile/CommonUserProfile'
import { useSelector } from 'react-redux';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import CommonNotification from '../../Components/CommonNotification/CommonNotification';

const Notification = () => {
  // == State Vars ==
  const [notifications, setNotifications] = useState([]);
  // == Redux Vars ==
  const currentUser = useSelector((state) => state.User.value)
  // == Firebase Vars ==
  const db = getDatabase()
  // == Functions ==
  useEffect(() => {
    onValue(ref(db, 'allNotifications/'), (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        if (item.val().notifyReceiverId == currentUser.uid) {
          array.push({...item.val(), id: item.key})
        }
      })
      setNotifications(array)
    })
  }, [])
  const handleRemove = (notificationId) => {
    remove(ref(db, 'allNotifications/' + notificationId))
  }
  console.log(notifications)
  return (
    <div>
        <div className="container">
            <div className="allUsersBg">
            <h1 className='allUsersTitle'>Notifications</h1>
            <div className="allUsersRow">
              {notifications.map((notify,i) => (                
                <div key={i} className='w-full flex justify-between items-center'>
                    <CommonNotification notifyTitle={notify.notifyType} notifyBody={notify.notifyMessage} notifyColor={notify.notifyMessageCol} />
                    <div className='flex gap-[10px]'>
                        <ButtonV1 buttonV1Text='Remove' buttonV1Color='text-[#fff]' buttonV1Bg='bg-gray-500' buttonV1Click={()=>handleRemove(notify.id)} />
                    </div>
                </div>
              ))}
            </div>
            </div>
        </div>
    </div>
  )
}

export default Notification