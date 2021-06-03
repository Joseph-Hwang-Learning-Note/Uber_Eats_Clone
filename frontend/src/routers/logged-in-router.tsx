import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { meQuery } from 'src/api/meQuery';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import ClientRoutes from './client-router';

const ME_QUERY = gql`
  query meQuery {
    me {
      id,
      email,
      role,
      verified
    }
  }
`;

const LoggedInRouter: React.FC = () => {

  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        { data.me.role === 'Client' && ClientRoutes }
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
