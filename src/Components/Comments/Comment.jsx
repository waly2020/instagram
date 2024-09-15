import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import {AiOutlineDelete} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { parseDate } from '../../utils/utils';
import AvatarDisplay from '../Profile/UserAvatar';
import toast, { Toaster } from 'react-hot-toast';

const Comment = ({ comment,postId }) => {
    const {auth} = useSelector(state => state);
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "posts", postId, "comments", comment.id));
            toast.success("Comment deleted successfully.");
        } catch (error) {
            toast.error("Failed to delete comment.");
        }
    };

    return (
        <>
        <Toaster/>
        <div className='grid grid-cols-[50px_1fr_30px] gap-2 mb-2'>
            <div>
                <AvatarDisplay userId={comment.userId}/>
            </div>
            <div className='bg-gray-100 p-2 rounded'>
            <div className='mb-2'>
                <p className='font-bold'>{comment.user.name}</p>
            <p className='text-[12px]'>{parseDate(comment.timestamp.seconds * 1000)}</p>
            </div>
            <p>{comment.text}</p>
            
            </div>
            <div className='flex justify-end items-end'>
            {auth && auth.userId === comment.userId && (
                <button onClick={handleDelete} className="px-2 rounded bg-red-600 text-white">
                    <AiOutlineDelete size={15} className="inline-block "/> 
                </button>
            )}
            </div>
        </div>
        </>
    );
};

export default Comment;
