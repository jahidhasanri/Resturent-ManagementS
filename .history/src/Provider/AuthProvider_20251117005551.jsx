import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.config';
import axios from 'axios';
export const AuthContext= createContext(null)
const AuthProvider = ({children}) => {
    const [user,SetUser]=useState(null);
    const [loader,SetLoader]=useState(true);
     const [allDishes, setDishes] = useState([]);
      const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://resturent-management-server-three.vercel.app/finalorder");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

       useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://resturent-management-server-three.vercel.app/allusers");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

 useEffect(() => {
  if (user?.email) {   
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://resturent-management-server-three.vercel.app/users?email=${user.email}`);
        SetUser(response.data);   
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }
}, [user?.email]);  

 useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("https://resturent-management-server-three.vercel.app/allsdishes");
        setDishes(response.data);
       
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

// console.log(user);

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
        handleLoginWithGoogle,
        allDishes,
        users,
        orders
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