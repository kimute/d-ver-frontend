import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { Header } from '../components/header';
import { useMehook } from '../hooks/useMehook';
import { NotFound } from '../pages/404';
import { Category } from '../pages/client/category';
import { Restaurant } from '../pages/client/restaurant';
import { Restaurants } from '../pages/client/restaurants';
import { Search } from '../pages/client/search';
import { SearchAgain } from '../pages/client/search_again';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm">
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={4} path="/search">
    <Search />
  </Route>,
  <Route key={5} path="/category/:slug">
    <Category />
  </Route>,
  <Route key={6} path="/research">
    <SearchAgain />
  </Route>,
  <Route key={7} path="/restaurant/:id">
    <Restaurant />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMehook();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className=" font-medium text-yellow-400 text-lg tracking-wide">
          Loading....
        </span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
