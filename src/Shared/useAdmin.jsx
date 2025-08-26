import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);

  const isAdmin = !!user && user.role === "admin"; 
  const isAdminLoading = loading || !user; 

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
