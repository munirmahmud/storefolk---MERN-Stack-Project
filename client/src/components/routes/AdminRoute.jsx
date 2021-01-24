import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { currentAdmin } from '../../helpers/auth';
import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = ({children, ...rest}) => {
    const { user } = useSelector(state => ({ ...state }));
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if(user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    setSuccess(true);
                })
                .catch((error) => {
                    setSuccess(false);
                })
        }
    }, [user]);
    
    return (
        <>
            {success ? (
                <Route {...rest}/>
            ) : (
                <LoadingToRedirect />
            )}
        </>
    )
}

export default AdminRoute;
