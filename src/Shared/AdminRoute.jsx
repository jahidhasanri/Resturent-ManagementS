// import React, { useContext } from 'react';
// import UseAdmin from '../hooks/UseAdmin';
// import { AuthContext } from '../Provider/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import useAdmin from './useAdmin';

// const AdminRoute = ({children}) => {
//     const [isAdmin,isAdminLoading]=useAdmin();
//     console.log(isAdmin);
//     const {user,loader}=useContext(AuthContext)
//    const navigate = useNavigate()
//     if(loader || isAdminLoading){
//         return <progress className='progress w-56'></progress>
//     }
//     if(user && isAdmin){
//         return children;
//     }
//    return navigate('/login')
// };

// export default AdminRoute;