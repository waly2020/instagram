import React, { useState } from 'react';
import { storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { AiOutlineCloudUpload, AiOutlineCheckCircle } from 'react-icons/ai';

const AvatarUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth(); 

  const handleUploadStart = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadSuccess = async () => {
    if (!file) {
      setMessage('Please select an image.');
      return;
    }
    if (!currentUser) {
      setMessage('You must be logged in to update your avatar.');
      return;
    }

    const storageRef = ref(storage, `users/${currentUser.uid}/avatar`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
      const userRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Le document n'existe pas, vous pouvez le créer ici
        await setDoc(userRef, { avatar: photoURL }, { merge: true });
      } else {
        // Le document existe, vous pouvez le mettre à jour
        await updateDoc(userRef, { avatar: photoURL });
      }

      setMessage('Avatar updated successfully.');
      setFile(null);
    } catch (error) {
      console.error('Error updating avatar:', error);
      setMessage('Failed to update avatar.');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <label htmlFor="avatar-upload" className='mb-2 cursor-pointer flex flex-col items-center'>
        <AiOutlineCloudUpload className='text-3xl' />
        <span className='ml-2'>Choose Avatar</span>
      </label>
      <input id="avatar-upload" type="file" onChange={handleUploadStart} className='hidden' />
      <button onClick={handleUploadSuccess} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center'>
        <AiOutlineCheckCircle className='text-xl' />
        <span className='ml-2'>Update Avatar</span>
      </button>
      {message && <p className='text-red-500 text-sm font-bold mt-2'>{message}</p>}
    </div>
  );
};

export default AvatarUpload;
