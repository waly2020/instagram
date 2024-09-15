import React, { useState } from 'react';
import { storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { AiOutlineCloudUpload} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import MainLoader from '../Loader/MainLoader';

const FormAvatar = () => {
  const [file, setFile] = useState(null);
  const [loader,setLoader] = useState(false);
  const {auth} = useSelector(state => state);

  const handleUploadStart = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadSuccess = async () => {
    if (!file) {
      toast.error('Aucne image selectionner');
      return;
    }
    if(loader){
      return;
    }
    setLoader(true);

    const storageRef = ref(storage, `users/${auth.userId}/avatar`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
      const userRef = doc(db, 'users', auth.userId);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, { avatar: photoURL }, { merge: true });
      } else {
        await updateDoc(userRef, { avatar: photoURL });
      }

      toast.success('Profil mis a jour.');
      setLoader(false);
      setFile(null);
    } catch (error) {
      toast.error('Profil non mis a jour');
    }
  };

  return (
    <>
    <Toaster/>
    <div className='grid grid-rows-[400px_50px] bg-white p-2 gap-3 rounded w-full max-w-[500px] shadow'>
      <div className='relative flex justify-center items-center bg-slate-100 rounded'>
      <input className='w-full h-full cursor-pointer absolute left-0 top-0 opacity-0' accept='image/*' type="file" onChange={handleUploadStart} />
      {file ? <img className='w-full h-full object-cover rounded' src={URL.createObjectURL(file)} alt='file preview'/> : <AiOutlineCloudUpload className='text-gray-400' size={50}/>}
      </div>
      <button onClick={handleUploadSuccess} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center'>
        <span className='ml-2 text-center uppercase w-full'>{loader ? <MainLoader/> : "Mettre la photo a jour"}</span>
      </button>
    </div>
    </>
  );
};

export default FormAvatar;
