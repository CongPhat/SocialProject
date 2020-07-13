import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

export const ShowRouter = (routers: Array<object>): JSX.Element => {
  const result = routers.map((router: any, index: number) => {
    return <Route key={index} path={router.path} exact={router.exact} component={router.main} />;
  });
  return <Switch>{result}</Switch>;
};
