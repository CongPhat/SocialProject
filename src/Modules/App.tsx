import React from 'react';
import { Provider } from 'react-redux';
import {store} from './../Store/store';
import PrivateLogin from '@HOC/PrivateLogin/PrivateLogin';
import {routerApp} from '@Router/router.app';
import {ShowRouter} from '@Router/showRouter';
import AppLogin from './AppLogin';

interface Props {
  privateLogin?: boolean
}

const App: React.FC<Props> = ({privateLogin}) => {
  return (
      <>
        {privateLogin ? <AppLogin /> : ShowRouter(routerApp)}
      </>
  )
}

export default PrivateLogin(App);
