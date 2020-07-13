import React, { useState, useEffect } from 'react';
import {withRouter, RouteComponentProps } from 'react-router-dom';

function DefaultLogin(Component: React.ComponentType<any | string>) {
  return withRouter(({history}: RouteComponentProps) => {
    return (
      <>
        <header>login roi ne</header>
        <Component />
      </>
    )
  })
}

export default DefaultLogin;
