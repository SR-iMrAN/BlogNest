import React, { createContext, useState, useEffect } from 'react';
import app from './../firebase/firebase.config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
export { auth };

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Create a secure axios instance with interceptor
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3007', // replace with your backend URL
  });

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // ✅ Auth Functions
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
    return signOut(auth);
  };

  // ✅ Monitor user login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
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
    axiosSecure, // ✅ exported so you can use it anywhere securely
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
