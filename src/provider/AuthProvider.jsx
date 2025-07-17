import React, { createContext, useState, useEffect } from 'react';
import app from './../firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
export { auth };

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth Functions
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  // onAuthStateChanged with JWT Token Fetch
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();

          const response = await axios.post(
            'http://localhost:3007/jwt',
            { email: currentUser.email },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          localStorage.setItem('access-token', response.data.token);
        } catch (error) {
          console.error('JWT fetch error:', error);
          localStorage.removeItem('access-token');
        }
      } else {
        localStorage.removeItem('access-token');
      }
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading,
    setUser,
    createUser,
    signIn,
    logOut,
    updateUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
