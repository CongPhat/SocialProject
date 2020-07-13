import React, {useState} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import styles from './style.module.scss';
import FormLogin from './container/FormLogin';

const {login} = styles;

interface Props {

}

const Login: React.FC<Props> = ({history}: RouteComponentProps) => {
  return (
    <div className={`${login} d-flex justify-content-center align-items-center`}>
      <FormLogin />
    </div>
  )
}

export default withRouter(Login)
