import { useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { FiSend } from "react-icons/fi";
import MainLoader from "../Loader/MainLoader";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import AllComments from "../Comments/AllComments";

const PostDetails = ({ post, setShowComments }) => {
    const commentsRef = useRef();
    const [commentLoader,setCommentLoader] = useState(false);
    const {auth} = useSelector(state => state);

    const handleCommentSubmit = async () => {
        if (commentsRef.current.value === '') {
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
                commentsRef.current.value = "";
                toast.success("Commentaire ajouter.");
                setCommentLoader(false);
            })
        } catch (error) {
            toast.error("Commentaire non ajouter.");
            setCommentLoader(false);
        }
    };
  return (
    <Modal isOpen={true} closeModal={() => setShowComments(false)}>
        <Toaster/>
      <div className="w-[800px] p-2 grid grid-cols-2 bg-white gap-3 rounded h-[500px]">
        <div className="relative">
          <img
            className="w-full h-full object-contain"
            src={post.photoURL}
            alt="post"
          />
        </div>
        <div className="">
          <div className="overflow-y-scroll h-[400px] py-2 remove-scroll">
            <AllComments postId={post.id} />
          </div>
          <div className="mt-2 grid grid-cols-[1fr_50px] border rounded overflow-hidden items-center px-3">
            <textarea
              className="resize-none py-2 outline-none"
              ref={commentsRef}
              placeholder="Ajouter un commentaire..."
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className="hover:bg-green-600 hover:text-white h-[50px] rounded-[99px] transition-all duration-500 flex justify-center items-center"
            >
              {commentLoader ? <MainLoader /> : <FiSend size={20} />}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostDetails;
