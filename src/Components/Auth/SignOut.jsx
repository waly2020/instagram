import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

const SignOut = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // Ajout d'un état de chargement
  const [error, setError] = useState('');         // Gestion des erreurs

  const handleSignOut = async () => {
    setLoading(true);
    setError('');  // Réinitialiser l'erreur
    try {
      await signOut(auth);
      navigate('/login');  // Redirection après déconnexion
    } catch (error) {
      console.error('Error signing out: ', error);
      setError('Failed to sign out.');  // Affichage de l'erreur
      setLoading(false);  // Arrêter le chargement
    }
  };

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      <button 
        onClick={handleSignOut} 
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}  
      >
        {loading ? 'Signing Out...' : 'Sign Out'}
      </button>
    </div>
  );
};

export default SignOut;
