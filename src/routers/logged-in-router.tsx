import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../components/header';
import { useMehook } from '../hooks/useMehook';
import { NotFound } from '../pages/404';
import { Category } from '../pages/client/category';
import { Restaurant } from '../pages/client/restaurant';
import { Restaurants } from '../pages/client/restaurants';
import { Search } from '../pages/client/search';
import { DriverBoard } from '../pages/driver/driverboard';
import { Order } from '../pages/order';
import { CreateDish } from '../pages/owner/create-dish';
import { CreateRestaurant } from '../pages/owner/create-restaurant';
import { Myrestaurant } from '../pages/owner/my-restaurant';
import { MyRestaurants } from '../pages/owner/my-restaurants';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { UserRole } from '../__generated__/globalTypes';

const clientRoutes = [
  {
    path: '/',
    component: <Restaurants />,
  },
  {
    path: '/search',
    component: <Search />,
  },
  {
    path: '/category/:slug',
    component: <Category />,
  },
  {
    path: '/restaurants/:id',
    component: <Restaurant />,
  },
];

const restaurantRoutes = [
  { path: '/', component: <MyRestaurants /> },
  { path: '/create-restaurant', component: <CreateRestaurant /> },
  { path: '/restaurants/:id', component: <Myrestaurant /> },
  { path: '/restaurants/:restaurantId/create-dish', component: <CreateDish /> },
];

const driverRoutes = [{ path: '/', component: <DriverBoard /> }];
const commonRoutes = [
  {
    path: '/confirm',
    component: <ConfirmEmail />,
  },
  {
    path: '/edit-profile',
    component: <EditProfile />,
  },
  {
    path: '/orders/:id',
    component: <Order />,
  },
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
        {data.me.role === 'Client' &&
          clientRoutes.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          ))}
        {data.me.role === 'Owner' &&
          restaurantRoutes.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Delivery &&
          driverRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path} exact>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
