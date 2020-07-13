import React from 'react';
import Loadable from 'react-loadable';
import {LoadingPage} from '@Common/LoadingPage';

const Login = Loadable({
  loader: () => import('@Modules/Login'),
  loading: LoadingPage
})

export const routerApp: Object[] = [
  {
    path: '/login',
    exact: true,
    main: ({match, location, history}: any) => <Login  />
  },
]
