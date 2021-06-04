import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientRoutes from './client-router';
import Header from 'src/components/header';
import NotFound from 'src/pages/404';
import { useMe } from 'src/hooks/useMe';


const LoggedInRouter: React.FC = () => {

  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        { data.me.role === 'Client' && ClientRoutes }
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
