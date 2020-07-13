import React from 'react';
import DefaultLogin from '@HOC/DefaultLogin';
import {routerAppLogin} from '@Router/router.app.login';
import {ShowRouter} from '@Router/showRouter';

interface Props {
  privateLogin?: boolean
}

const AppLogin: React.FC<Props> = ({}) => {
  return (
    <>{ShowRouter(routerAppLogin)}</>
  )
}

export default DefaultLogin(AppLogin);
