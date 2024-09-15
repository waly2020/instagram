import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { db, storage } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import MainLoader from "../Loader/MainLoader";
import toast, { Toaster } from "react-hot-toast";
import UserAvatar from "../Profile/UserAvatar";

const Form = () => {
    const [image,setImage] = useState(null);
    const [loader,setLoader] = useState(false);
    const {auth} = useSelector(state => state);
    const captionRef = useRef();

    const onSelectImage = (event) =>{
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }
    const onDeleteImage = () =>{
        setImage(null);
    }
    const onCreatePost = async () =>{
        setLoader(true);
        if(image === null){
            toast.error('Ajouter une image');
            setLoader(false)
            return;
        }
        try {
            const fileRef = ref(storage, `${auth.userId}/posts/${Date.now()}_${image.name}`);
            const snapshot = await uploadBytes(fileRef, image);
            const photoURL = await getDownloadURL(snapshot.ref);
      
            await addDoc(collection(db, 'posts'), {
              photoURL,
              caption : captionRef.current.value,
              userId: auth.userId, 
              user : {
                email : auth.email,
                name : auth.name,
                lastname : auth.family_name
              }, 
              userProfilePic: auth?.photoURL ?? "none", 
              timestamp: serverTimestamp(),
              likes: 0,
              comments: 0,
              likedBy: []
            }).then(res =>{
                console.log("Post added");
                console.log(res);
                console.log("Post added");
                window.location.reload();
            }).catch(err =>{
                console.log(err);
                setLoader(false);
            });
          } catch (error) {
            console.error('Error creating post: ', error);
          }
    }
    return (
        <>
        <Toaster/>
        <div className="bg-white py-3 rounded w-full max-w-[800px] grid grid-rows-[60px_400px] grid-cols-2">
            <div className="col-span-2 flex justify-between items-center px-3 border-b">
                <p>
                
                </p>
                <p className="font-bold">Créer une publication</p>
                {loader ? <MainLoader/> : <button onClick={onCreatePost} className="text-blue-600 font-bold">Partager</button>}
            </div>
            <div className="p-3">
            <div className="w-full h-full flex justify-center items-center relative">
                
                {image ? <img className="w-full h-full object-contain" src={URL.createObjectURL(image)} alt="selected"/> : <p className="text-[40px] text-gray-300"><GrGallery/></p>}

                <div className="absolute right-0 bottom-0 flex gap-4">
                    <button onClick={onDeleteImage} className="flex gap-2 items-center justify-center w-[35px] h-[35px] rounded-[99px] bg-red-700 bg-opacity-70 text-white">
                        <IoClose/>
                    </button>
                    <button className="flex gap-2 items-center justify-center w-[35px] h-[35px] rounded-[99px] bg-blue-800 bg-opacity-70 text-white">
                        <GrGallery size={12}/>
                        <input onChange={onSelectImage} className="absolute w-full h-full opacity-0 cursor-pointer" type="file" accept="image/*"/>
                    </button>
                </div>

            </div>
            </div>
            <div className="grid grid-rows-[50px_1fr] p-3 gap-3">
                <div className="">
                    <div className="flex gap-2 items-center">
                        <UserAvatar userId={auth.userId}/>
                        <div>
                            <p className="font-bold">{auth?.name}</p>
                            <p className="text-gray-600 text-[14px]">{auth?.email}</p>
                        </div>
                    </div>
                </div>
                <textarea ref={captionRef} className="border resize-none outline-none p-3 rounded bg-gray-50" placeholder="Votre message..."></textarea>
            </div>
        </div>
        </>
    );
}

export default Form;
