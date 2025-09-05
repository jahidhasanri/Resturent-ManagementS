import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const {tranId}= useParams();
    return (
        <div>
            this is payment success page{tranId}
        </div>
    );
};

export default PaymentSuccess;