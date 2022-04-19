import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
    isLoggedIn,
    component:Component,
    ...rest
}) => {
  
    return (
        <Route {...rest}
        component={(props) =>(
            (isLoggedIn)
                ? (<Redirect to='/'/>) 
                : (<Component {...props}/> )
        )}
        />
    );
};