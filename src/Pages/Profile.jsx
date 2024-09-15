import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import Modal from "../Components/Modal/Modal";
import MainLoader from "../Components/Loader/MainLoader";
import FormAvatar from "../Components/Profile/FormAvatar";

const Profile = () => {
    const {auth} = useSelector(state => state);
    const [avatarUrl,setAvatarUrl] = useState("");
    const [modalUpdate,setModalUpdate] = useState(false);
    console.log(auth);

    useEffect(() => {
          const unsub = onSnapshot(doc(db, 'users', auth.userId), (doc) => {
            const userData = doc.data();
            
            console.log(userData);
            if (userData && userData.avatar) {
              setAvatarUrl(userData.avatar);
            } else {
              setAvatarUrl('/asset/profil.png');
            }
          }, error => {
            setAvatarUrl('/asset/profil.png');
          });
    
          return () => unsub();
      }, [auth.userId]);
  return (
    <>
    <Modal isOpen={modalUpdate} closeModal={() => {setModalUpdate(false)}}>
        <FormAvatar/>
    </Modal>
    <Layout>
      <div className="py-8 px-3">
        <div className="flex gap-6 items-center">
            <div className="w-[200px] h-[200px] flex justify-center items-center rounded-[999px] overflow-hidden border">
              {avatarUrl ? <img className="w-full h-full object-contain" src={avatarUrl} alt="user profil"/> : <MainLoader/>}
            </div>
            <div className="flex flex-col gap-3 items-start">
                <p className="font-bold text-2xl">{auth.name} {auth.family_name}</p>
                <p className="font-bold text-gray-500">{auth.email} | {auth.phone_number}</p>
                <button className="bg-gray-200 px-4 py-2 rounded" onClick={() =>{ setModalUpdate(true)}}>Modifier la photo de profil</button>
            </div>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default Profile;
