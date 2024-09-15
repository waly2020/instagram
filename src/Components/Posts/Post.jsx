import { useRef, useState } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, addDoc, collection } from 'firebase/firestore';
import AvatarDisplay from '../Profile/UserAvatar';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';
import MainLoader from '../Loader/MainLoader';
import { parseDate } from '../../utils/utils';
import PostDetails from './PostDetails';

const Post = ({ post }) => {
    const {auth} = useSelector(state => state);
    const [commentLoader,setCommentLoader] = useState(false);
    const [liked,setLiked] = useState(post.likedBy.includes(auth?.userId));
    const commentsRef = useRef();
    const [showComments, setShowComments] = useState(false); 

    const toggleLike = async () => {

        const postRef = doc(db, "posts", post.id);
        try {
            if (post.likedBy.includes(auth?.userId)) {
                await updateDoc(postRef, { likedBy: arrayRemove(auth.userId) }).then(() =>{
                    setLiked(!liked);
                }).catch(err =>{
                    toast.error("Commentaire non ajouter.");
                })
            } else {
                await updateDoc(postRef, { likedBy: arrayUnion(auth.userId) }).then(() =>{
                    setLiked(!liked);
                }).catch(err =>{
                    toast.error("Commentaire non ajouter.");
                })
            }
        } catch (error) {
            toast.error("Probleme de connexion.");
        }
    };

    const deletePost = async () => {

        const postRef = doc(db, "posts", post.id);
        try {
            await deleteDoc(postRef);
            toast.success("Post supprimer avec succes");
        } catch (error) {
            toast.error("Post non supprimer");
        }
    };

    const handleCommentSubmit = async (e) => {
        if (commentsRef.current.value.trim() === '') {
            toast.error("Le champ commentaire est vide");
            return;
        }
        if(commentLoader){
            return;
        }
        setCommentLoader(true);
        try {
            const postRef = doc(db, "posts", post.id);
            const commentData = {
                text: commentsRef.current.value,
                userId: auth.userId,
                timestamp: new Date(),
                user : {
                    name : auth.name,
                    email : auth.email
                }
            };
            await addDoc(collection(postRef, "comments"), commentData).then(res =>{
                console.log(res);
                commentsRef.current.value = "";
                toast.success("Commentaire ajouter.");
                setCommentLoader(false);
            })
        } catch (error) {
            toast.error("Le commentaire n'as pu etre ajouter");
            setCommentLoader(false);
        }
    };

    return (
        <>
        <Toaster/>
        <div className="mb-4 w-full max-w-[500px] mx-auto">
            <div className='flex gap-2 items-center'>
                <AvatarDisplay userId={post.userId} />
                <div>
                    <p>{post?.user?.name}</p>
                    <p className='text-[13px] text-gray-600'>{post?.user?.email}</p>
                </div>
                
            </div>
            <img src={post.photoURL} alt="Post" className="w-full h-auto my-3 rounded"/>
            <div className='flex gap-3 justify-between items-center'>
            <div className='flex gap-5'>
            <button onClick={toggleLike} disabled={!auth} className='relative'>
                {liked ? <FaHeart size={30} color='red'/> : <CiHeart size={30} color='#000'/>}
            </button>
            <button onClick={() => setShowComments(true)} className="cursor-pointer">
                <AiOutlineComment color='#000' size={30}/>
            </button>
            </div>
            <p className="text-gray-500 text-sm mt-1">{parseDate(post.timestamp)}</p>
            </div>
            <div className="py-2 ">
                <p>{post.caption}</p>
                <div className="flex items-center justify-between mt-2">
                    
                    {auth && auth.uid === post.userId && (
                        <button onClick={deletePost} className="p-2 text-red-600 animate-bounce ease-in-out duration-300 relative">
                            <span className="text-1xl text-red-600" title="Delete Post"> 
                                <FaTrashAlt className="text-red-600" />
                             </span>
                        </button>
                    )}
                </div>
                <div className="mt-2 grid grid-cols-[1fr_50px] border rounded overflow-hidden items-center px-3">
                    <textarea className='resize-none py-2 outline-none' ref={commentsRef} placeholder='Ajouter un commentaire...'></textarea>
                    <button onClick={handleCommentSubmit} className='hover:bg-green-600 hover:text-white h-[50px] rounded-[99px] transition-all duration-500 flex justify-center items-center'>
                        {commentLoader ? <MainLoader/> : <FiSend size={20}/>}
                    </button>
                </div>
                <div className=" flex justify-end">
                    
                    {showComments && <PostDetails post={post} setShowComments={setShowComments} />}
                </div>
            </div>
        </div>
        </>
    );
};

export default Post;
