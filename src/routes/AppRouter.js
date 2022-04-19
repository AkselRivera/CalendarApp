import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../components/actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const {checking,uid} = useSelector( state => state.auth);

  useEffect(() => {
    dispatch(startChecking());
    
  }, [dispatch]);
  
  if( checking){
    return ( <h1>Loading...</h1> );
  }else

  return (
    <Router>
        <div>
        <Switch>


            <PublicRoute 
                  exact 
                  path="/login" 
                  component={ LoginScreen } 
                  isLoggedIn={!!uid}
            />

            <PrivateRoute 
                  path="/" 
                  component={ CalendarScreen } 
                  isLoggedIn={!!uid}
            />

            <Redirect to='/'/>
        </Switch>
        </div>
    </Router>
    
  
  );
};
