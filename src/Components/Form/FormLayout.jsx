import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const FormLayout = ({onChangeForm,status,children}) => {
    const navigate = useNavigate();
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          console.log('Google Sign-In Success', result.user);
          navigate('/');
        } catch (error) {
          console.error('Google Sign-In Error', error);
        }
      };
    const change = () => {
        if(onChangeForm){
            try {
                onChangeForm();
            } catch (error) {
                console.log("onChangeForm doit etre une fonction.");
            }
        }
    }
    return (
        <div className="w-full max-w-[450px] flex flex-col gap-4">
            <div className="shadow border rounded-sm p-5">
            <div className="flex justify-center mb-3">
            <img className="h-[60px]" src="/asset/logo.png" alt="logo insta"/>
            </div>
            {children}
            <div className="relative flex justify-center my-5">
                <div className="w-full border-b border-gray-400 absolute left-0 top-[50%] translate-y-[-50%]"></div>
                <div className="relative bg-white px-3">Ou</div>
            </div>
            <button onClick={googleSignIn} className="py-2 w-full hover:shadow-lg rounded transition-all duration-500 mt-4 flex justify-center items-center gap-3">
                <FaGoogle color="royalblue"/> <span>Utiliser Google</span>
            </button>
        </div>
        <div className="shadow border rounded-sm p-5 flex justify-center items-center">
            <button onClick={change}>
                {!status ?
                <>J'ai deja un compye <span className="text-blue-500">Je me connecte</span></> 
                 :
                  <>Vous n'avez pas de compte ? <span className="text-blue-500">Inscrivez-vous</span></> }
                
            </button>
        </div>
        </div>
    );
}

export default FormLayout;
