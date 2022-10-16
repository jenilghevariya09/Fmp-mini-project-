import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken } from '../../utility/token.utils';

const PrivateRoute = () => {
    const auth = getAuthToken(); 
    // debugger;
    return auth ? <Outlet /> : <Navigate to="/adminlogin" />;
}
export default PrivateRoute;