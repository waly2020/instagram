import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { FiUser } from 'react-icons/fi'; 

const AvatarDisplay = ({ userId }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (userId) {
      const unsub = onSnapshot(doc(db, 'users', userId), (doc) => {
        const userData = doc.data();
        if (userData && userData.avatar) {
          setAvatarUrl(userData.avatar);
        } else {
          
          setAvatarUrl('path_to_default_avatar.jpg');
        }
      }, error => {
        console.log("Failed to fetch avatar:", error);
        
        setAvatarUrl('path_to_default_avatar.jpg');
      });

      return () => unsub();
    }
  }, [userId]);

  return (
    <div >
      {avatarUrl && avatarUrl !== 'path_to_default_avatar.jpg' ? (
        <img src={avatarUrl} alt="avatar"  style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
      ) : (
        <FiUser size="26px"  className='mb-4 shadow bg-blue-500 text-white p-0 rounded-full hover:bg-blue-600 transition duration-300' /> 
      )}
    </div>
  );
};

export default AvatarDisplay;