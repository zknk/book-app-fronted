import React from 'react'
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const{currentUser} = useAuth();
    if(currentUser){
        return children;
    }
    return <Navigate to="/login" replace={true} />
}

export default PrivateRoute