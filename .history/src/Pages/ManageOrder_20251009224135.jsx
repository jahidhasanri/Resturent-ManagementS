import axios from 'axios';
import React from 'react';

const ManageOrder = () => {
    const data = ()=>{
        alldata= axios.get("https://resturent-management-server-three.vercel.app/finalorder")
    }
    console.log(alldata);
    return (
        <div>
            this is manage order page
        </div>
    );
};

export default ManageOrder;