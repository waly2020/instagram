import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FaComments } from 'react-icons/fa';
import AvatarDisplay from '../Profile/AvatarDisplay';
import CommentPopup from '../Comments/CommentPopup'; 
import { FaTrashAlt } from 'react-icons/fa';

const Post = ({ id, photoURL, caption, likedBy, userId, timestamp }) => {
    const [likes, setLikes] = useState(likedBy.length);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false); 

    const toggleLike = async () => {
        if (!currentUser) {
            setError("You must be logged in to like posts.");
            return;
        }

        const postRef = doc(db, "posts", id);
        try {
            if (isLiked) {
                await updateDoc(postRef, { likedBy: arrayRemove(currentUser.uid) });
                setLikes(prev => prev - 1);
            } else {
                await updateDoc(postRef, { likedBy: arrayUnion(currentUser.uid) });
                setLikes(prev => prev + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error updating like: ", error);
            setError("Failed to update like.");
        }
    };

    const deletePost = async () => {
        if (!currentUser || currentUser.uid !== userId) {
            setError("You must be logged in and be the post owner to delete posts.");
            return;
        }

        const postRef = doc(db, "posts", id);
        try {
            await deleteDoc(postRef);
            alert("Post deleted successfully.");
        } catch (error) {
            console.error("Error deleting post: ", error);
            setError("Failed to delete post.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError("Please log in to comment.");
            return;
        }
        if (comment.trim() === '') {
            setError("Comment cannot be empty.");
            return;
        }
        try {
            const postRef = doc(db, "posts", id);
            const commentData = {
                text: comment,
                userId: currentUser.uid,
                timestamp: new Date(),
            };
            await addDoc(collection(postRef, "comments"), commentData);
            setComment('');
        } catch (error) {
            console.error("Error adding comment: ", error);
            setError("Failed to add comment.");
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
            <AvatarDisplay userId={userId} />
            <img src={photoURL} alt="Post" className="w-full h-auto mt-3" />
            <div className="py-2 ">
                <p>{caption}</p>
                <p className="text-gray-500 text-sm mt-1">Posted at {timestamp.toDateString()} {timestamp.toLocaleTimeString()}</p>
                <div className="flex items-center justify-between mt-2">
                    <button onClick={toggleLike} disabled={!currentUser} className={`p-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                        {isLiked ? '❤️' : '👍'} Like
                    </button>
                    {currentUser && currentUser.uid === userId && (
                        <button onClick={deletePost} className="p-2 text-red-600 animate-bounce ease-in-out duration-300 relative">
                            <span className="text-1xl text-red-600" title="Delete Post"> 
                                <FaTrashAlt className="text-red-600" />
                             </span>
                        </button>
                    )}
                    <span>{likes} Likes</span>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div>
                    <form onSubmit={handleCommentSubmit} className="mt-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-sm mt-2 shadow bg-blue-500 text-slate-100 hover:text-black font-bold">Comment</button>
                    </form>
                </div>
                <div className=" flex justify-end">
                    <button onClick={() => setShowComments(true)} className="text-blue-500 cursor-pointer border-spacing-2 font-bold flex gap-2 items-center"><FaComments className="inline-block hover:text-yellow-500"/>View Comments</button>
                    {showComments && <CommentPopup postId={id} setShowComments={setShowComments} />}
                </div>
            </div>
        </div>
    );
};

export default Post;
