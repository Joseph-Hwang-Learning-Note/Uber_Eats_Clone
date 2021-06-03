import React from 'react';
import { Route } from 'react-router-dom';
import Restaurants from 'src/pages/client/restaurants';

const ClientRoutes = [
  // eslint-disable-next-line
  <Route path="/" exact>
    <Restaurants />
  </Route>
];

export default ClientRoutes;
