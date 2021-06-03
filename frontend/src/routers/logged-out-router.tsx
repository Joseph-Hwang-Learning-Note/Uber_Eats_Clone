import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateAccount from 'src/pages/create-account';
import Login from 'src/pages/login';

function LoggedOutRouter(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path='/create-account'>
          <CreateAccount />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default LoggedOutRouter;
