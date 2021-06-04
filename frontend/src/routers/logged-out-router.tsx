import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CreateAccount from 'src/pages/create-account';
import Login from 'src/pages/login';

const LoggedOutRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/create-account' exact>
          <CreateAccount />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Redirect to='/login' />
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
