import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import {AiOutlineDelete} from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Comment = ({ commentId, text, userId, postId }) => {
    const {auth} = useSelector(state => state);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteDoc(doc(db, "posts", postId, "comments", commentId));
                alert("Comment deleted successfully.");
            } catch (error) {
                console.error("Error deleting comment: ", error);
                alert("Failed to delete comment.");
            }
        }
    };

    return (
        <div className="p-2 border-b border-gray-300 flex justify-between items-center">
            <p>{text}</p>
            {auth && auth.uid === userId && (
                <button onClick={handleDelete} className=" hover:text-red-700 text-blue-600 p-2 rounded-full">
                    <AiOutlineDelete className="inline-block "/> 
                </button>
            )}
        </div>
    );
};

export default Comment;
