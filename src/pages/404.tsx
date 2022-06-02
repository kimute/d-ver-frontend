import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className=" h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Not Found | D-liver</title>
    </Helmet>
    <h2 className=" font-bold text-2xl mb-2">Page Not Found</h2>
    <h4 className=" font-medium mb-5">
      The page you're looking for does not exist
    </h4>
    <Link className=" text-yellow-500 hover:underline" to="/">
      Go back to Home &rarr;
    </Link>
  </div>
);
