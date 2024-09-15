import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiHome6Fill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
import Modal from '../Modal/Modal';
import Form from '../Posts/Form';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Aside = () => {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const {signOut} = useAuthenticator();
    return (
        <>
        <Modal isOpen={showCreatePost} closeModal={() => setShowCreatePost(false)}>
        <Form/>
      </Modal>
    <aside className='border-r min-h-screen h-full'>
        <div className='flex justify-center my-7'>
            <img className='h-[50px]' src='/asset/logo.png' alt='logo'/>
        </div>
      <ul className='p-3 flex flex-col gap-5'>
        <li>
            <NavLink to="/" className="[&.active]:text-black flex items-center text-gray-500 gap-2">
                <RiHome6Fill size={20}/>
                Accueil
            </NavLink>
        </li>
        <li>
            <NavLink to="/profil" className="[&.active]:text-black flex items-center text-gray-500 gap-2">
            <FaUserLarge size={18}/>
            Profil
            </NavLink>
        </li>
        <li onClick={() => setShowCreatePost(true)} className='p-2 cursor-pointer rounded'>
            Creer un post
        </li>
        <li className='p-2 cursor-pointer rounded' onClick={() =>{signOut()}}>
            Deconnexion
        </li>
      </ul>
    </aside>
        </>
    );
}

export default Aside;
