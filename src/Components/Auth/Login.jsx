import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import FormLayout from '../Form/FormLayout';
import InputIcon from '../Inputs/InputIcon';
import ButtonAuth from '../Buttons/ButtonAuth';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen bg-white" >
      <FormLayout status={isLogin} onChangeForm={() =>{setIsLogin(!isLogin)}}>
        {isLogin ? <UserLogin/> : <UserRegister/>}
      </FormLayout>
      
    </div>
    </>
  );
};

const UserLogin = () =>{
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const logUser = async (event) => {
    // event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      console.log(`Logged in Successfully :`, userCredential.user);
      navigate('/');
    } catch (error) {
      console.error(`Error Logging in :`, error);
    }
  };
  return <from className='flex flex-col gap-3'>
  <InputIcon
        icon={<AiOutlineMail/>}
        type="email"
        ref={emailRef}
            placeholder="Email..."
            autoComplete="username"
        />
          <InputIcon
          icon={<AiOutlineLock/>}
            type='password'
            ref={passwordRef}
            placeholder="Mot de passe..."
            autoComplete="current-password"
          />
          <ButtonAuth onClick={logUser} text="Se connecter"/>
  </from>
}
const UserRegister = () =>{
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const register = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      console.log(`Signed up Successfully :`, userCredential.user);
      navigate('/');
    } catch (error) {
      console.error(`rror Signing up :`, error);
    }
  };
  return <form className='flex flex-col gap-3'>
  <InputIcon
        icon={<AiOutlineMail/>}
        type="email"
        ref={emailRef}
            placeholder="Email..."
            autoComplete="username"
        />
          <InputIcon
          icon={<AiOutlineLock/>}
            type='password'
            ref={passwordRef}
            placeholder="Mot de passe..."
            autoComplete="current-password"
          />
          <InputIcon
          icon={<AiOutlineLock/>}
            type='password'
            ref={passwordRef}
            placeholder="Confirmer votre mot de passe..."
            autoComplete="current-password"
          />
          <ButtonAuth onClick={register} text="Cree mon compte"/>
  </form>
}

export default Login;

/*
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      console.log(`${isLogin ? 'Logged in' : 'Signed up'} Successfully:`, userCredential.user);
      navigate('/');
    } catch (error) {
      console.error(`${isLogin ? 'Error Logging in' : 'Error Signing up'}:`, error);
    }
  };
<form onSubmit={handleAuth} className="flex flex-col p-6 space-y-4 bg-white shadow-lg rounded-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">{isLogin ? 'Connectez-vous' : "Inscrivez-vous"}</h2>
        <div className="relative">
          <AiOutlineMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full pl-10 pr-4 py-2"
            autoComplete="username"
          />
        </div>
        <div className="relative">
          <AiOutlineLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="input input-bordered w-full pl-10 pr-4 py-2"
            autoComplete="current-password"
          />
          <div onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
          {isLogin ? <FiLogIn /> : <FiUserPlus />}
          {isLogin ? 'Connexion' : 'Inscription'}
        </button>
        <button type="button"  className="btn btn-secondary w-full flex items-center justify-center gap-2">
          <AiOutlineGoogle />
          {isLogin ? 'Google Connexion' : 'Google Inscription'}
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-600 hover:text-blue-700">
          {isLogin ? 'Pas de compte ? Inscrivez-vous ici' : 'Déjà un compte ? Connectez-vous ici'}
        </button>
      </form>
*/