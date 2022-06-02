import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  searchRestaurant,
  searchRestaurantVariables,
} from '../../__generated__/searchRestaurant';

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface ISearchForm {
  searchTerm: string;
}

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  //lazyQuery
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split('?term=');
    if (!query) {
      //not showing url
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      history.replace('/');
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, []);
  console.log(loading, data, called);
  const keyword = useParams();
  const { register, handleSubmit, getValues } = useForm<ISearchForm>();
  const onSearch = () => {
    console.log(getValues());
    const { searchTerm } = getValues();

    history.replace({
      pathname: '/research',
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <>
      <div>
        <Helmet>
          <title>Search | D-liver</title>
        </Helmet>
        <div className="py-20 flex items-center justify-between px-5 xl:px-0 w-full mx-auto bg-gray-700 h-3 ">
          {!loading && (
            <div className="flex flex-col  xl:ml-20 ">
              <h1 className=" text-yellow-50 mr-10 text-xl uppercase md:text-2xl ">
                "{location.search.split('?term=')}"
              </h1>
              <span className=" text-yellow-400 mt-3 text-sm">
                {data?.searchRestaurant.totalResults}+results
              </span>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSearch)}
            className=" flex items-center justify-center w-full md:w-4/12 xl:mr-20"
          >
            <input
              {...register('searchTerm', {
                required: true,
              })}
              name="searchTerm"
              type="search"
              className="input w-full "
              placeholder="Search Restaurant..."
            />
          </form>
        </div>
      </div>
    </>
  );
};
