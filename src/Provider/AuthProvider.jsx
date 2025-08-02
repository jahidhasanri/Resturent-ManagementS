import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.config';
export const AuthContext= createContext(null)
const AuthProvider = ({children}) => {
    const [user,SetUser]=useState(null);
    const [loader,SetLoader]=useState(true);
console.log(user);
    const handelWithRegister = (email, password)=>{
        SetLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }




    const authInfo={
        user,
        SetUser,
        loader,
        SetLoader,
        handelWithRegister,
    }


    // observer
   useEffect(()=>{
       const unsubscribe =onAuthStateChanged(auth, (currentUser) =>{
           if(currentUser){
            SetUser(currentUser)
               SetLoader(false)
           }
           else{
            SetUser(null)
            // SetLoader(true)
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