import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.config';
export const AuthContext= createContext(null)
const AuthProvider = ({children}) => {
    const [user,SetUser]=useState(null);
    const [loader,SetLoader]=useState(true);

    const provider = new GoogleAuthProvider();
    const handelWithRegister = (email, password)=>{
        SetLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const handelLogout = ()=>{
        SetLoader(true)
        return signOut(auth);
    }

    const handleLoginwithEmail = (email,password)=>{
        SetLoader(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleLoginWithGoogle = ()=>{
        SetLoader(true);
        return signInWithPopup(auth, provider);
    }


    const authInfo={
        user,
        SetUser,
        loader,
        SetLoader,
        handelWithRegister,
        handelLogout,
        handleLoginwithEmail,
        handleLoginWithGoogle
    }


    // observer
   useEffect(()=>{
       const unsubscribe =onAuthStateChanged(auth, (currentUser) =>{
           if(currentUser){
             SetUser(currentUser || null);
            SetLoader(false);
           }
           else{
            SetUser(null)
           
           }
       })
        return () => {
            unsubscribe();
        };
   },[])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;