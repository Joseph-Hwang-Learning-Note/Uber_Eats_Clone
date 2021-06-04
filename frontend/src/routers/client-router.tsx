import React from 'react';
import { Route } from 'react-router-dom';
import Restaurants from 'src/pages/client/restaurants';
import ConfirmEmail from 'src/pages/users/confirm-email';
import EditProfile from 'src/pages/users/edit-profile';

const ClientRoutes = [
  <Route key="restaurants" path="/" exact>
    <Restaurants />
  </Route>,
  <Route key="confirmEmail" path='/confirm' exact>
    <ConfirmEmail />
  </Route>,
  <Route key="editProfile" path="/edit-profile" exact>
    <EditProfile />
  </Route>
];

export default ClientRoutes;
