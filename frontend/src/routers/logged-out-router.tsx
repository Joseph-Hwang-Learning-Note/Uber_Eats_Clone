import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from 'src/pages/404';
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
