import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const ManageUsers = () => {
    const [allUser, SetallUser]=useState('');
    useEffect(()=>{
        const handelfetch = async()=>{
            try{
                const response =await axios.get('http://localhost:5000/allusers');
                SetallUser( response.data) ;
            }catch (error) {
        console.error("Error fetching dishes:", error);
      }
        }
        handelfetch();
    },[])
    console.log(allUser);
    return (
        <div>
            this is manage user page
        </div>
    );
};

export default ManageUsers;