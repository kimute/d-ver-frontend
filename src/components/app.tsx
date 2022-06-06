import { gql, useQuery, useReactiveVar } from '@apollo/client';
import React from 'react';
import { isLoggedInVar } from '../apollo';
import { LoggedInRouter } from '../routers/logged-in-router';
import { LoggedOutRouter } from '../routers/logged-out-router';

// below is old way
// const IS_LOGGED_IN = gql`
//   query isLoggedIn{
//     isLoggedIn @client
//   }
// `

export const App = () => {
  // check value from router if loggedin :{isLoggedIn: false}
  //const {data:{isLoggedIn}} = useQuery(IS_LOGGED_IN)
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log(isLoggedIn);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
