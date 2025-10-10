import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const MyProfile = () => {
    const { user} = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            this is my profile
        </div>
    );
};

export default MyProfile;