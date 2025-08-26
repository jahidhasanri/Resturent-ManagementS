import React, { useContext } from 'react';
import { AuthContext } from './Provider/AuthProvider';

const Private = ({children}) => {
    const {user,loader}=useContext(AuthContext)
     if (loader) {
        return <span className="loading loading-spinner text-error"></span>;
    }

    if (user) {
        return children;
    }

       return <Navigate to="/login" replace />;
};

export default Private;