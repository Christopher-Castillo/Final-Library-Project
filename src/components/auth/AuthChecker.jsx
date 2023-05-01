import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithRedirect, onAuthStateChanged } from 'firebase/auth';
import { auth, Providers } from '../config/firebase';

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();

  const signInOnClick = async () => {
    await signInWithRedirect(auth, Providers.google);
  }

  useEffect(() => {
    const auth_state = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInOnClick()
        navigate('/dashboard');
      }
    });
    return () => auth_state();
  }, [auth, navigate]);

  return (
    <>
      {children}
    </>
  );
}

export default AuthChecker;
