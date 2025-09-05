import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const {trandId}= useParams();
    return (
        <div>
            this is payment success page{trandId}
        </div>
    );
};

export default PaymentSuccess;