import axios from 'axios';
import React from 'react';

const ManageOrder = () => {
    const data = ()=>{
       const alldata= axios.get("http://localhost:5000/finalorder")
    }
    console.log(alldata);
    return (
        <div>
            this is manage order page
        </div>
    );
};

export default ManageOrder;