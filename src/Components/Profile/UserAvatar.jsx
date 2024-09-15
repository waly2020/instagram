import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { FiUser } from 'react-icons/fi'; 

const UserAvatar = ({ userId }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (userId) {
      const unsub = onSnapshot(doc(db, 'users', userId), (doc) => {
        const userData = doc.data();
        console.log(userData);
        if (userData && userData.avatar) {
          setAvatarUrl(userData.avatar);
        } else {
          
          setAvatarUrl('/asset/profil.png');
        }
      }, error => {
        console.log("Failed to fetch avatar:", error);
        
        setAvatarUrl('/asset/profil.png');
      });

      return () => unsub();
    }
  }, [userId]);

  return (
    <div className='overflow-hidden w-[50px] h-[50px] rounded-[99px] flex justify-center items-center'>
      {avatarUrl ? <img className='w-[90%] h-[90%] object-contain' src={avatarUrl} alt='user avatar'/> : <FiUser size="26px"  className='mb-4 shadow bg-blue-500 text-white p-0 rounded-full hover:bg-blue-600 transition duration-300' />}
    </div>
  );
};

export default UserAvatar;