import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {withRouter, RouteComponentProps } from 'react-router-dom';
import {ACTION_LOGIN} from '@Store/Reducer/Login/Login.Action';
import axios from 'axios';

const {LOGIN_BEFORE} = ACTION_LOGIN;

interface RootState {
  login: {privateLogin: boolean}
}

const setResponsive = () => {
  console.log(axios.defaults);
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    let {status} = error.response;
    console.log(status);
    return Promise.reject(error);
  });
}


function PrivateLogin(Component: React.ComponentType<any | string>) {
  return withRouter(({history}: RouteComponentProps) => {
    const [statusLogin, setStatusLogin] = useState<boolean>(false);
    const login = useSelector((state: RootState) => state.login.privateLogin);
    const dispath = useDispatch();

    useEffect(() => {
      const jwtToken: string = localStorage.getItem('jwtToken');
      if(jwtToken) {
        axios.defaults.headers.common['Authorization'] = jwtToken;
        dispath({type: LOGIN_BEFORE});
      } else {
        history.push('/login');
      }
      setStatusLogin(true);
      setResponsive();
    }, [])

    return (
      <>
        {statusLogin && <Component privateLogin={login}/>}
      </>
    )
  })
}

export default PrivateLogin;
