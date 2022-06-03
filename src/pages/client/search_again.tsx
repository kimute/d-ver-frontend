import { gql, useLazyQuery } from '@apollo/client';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Restaurant } from '../../components/restaurant';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  searchRestaurant,
  searchRestaurantVariables,
} from '../../__generated__/searchRestaurant';

const SEARCH_RESTAURANT = gql`
  query searchRestaurantAgain($input: SearchRestaurantInput!) {
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

export const SearchAgain = () => {
  const [page, setPage] = useState(1);
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
          page: page,
          query,
        },
      },
    });
  }, []);
  const keyword = useParams();
  const { register, handleSubmit, getValues } = useForm<ISearchForm>();
  const onSearch = () => {
    console.log(getValues());
    const { searchTerm } = getValues();

    history.replace({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };
  const onClickNextPage = () => setPage((page) => page + 1);
  const onClickPrevPage = () => setPage((page) => page - 1);
  return (
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
            placeholder="Search Restaurant.."
          />
        </form>
      </div>
      <div className="max-w-screen-xl mx-auto mt-8 pb-20">
        <div className="grid mt-10 mb-3 md:grid-cols-3 gap-x-7 gap-y-10 2xl:w-10 px-2 text-sm">
          {data?.searchRestaurant.restaurants?.map((restaurant) => (
            <Restaurant
              key={restaurant.id}
              id={restaurant.id + ''}
              coverImg={restaurant.coverImg}
              name={restaurant.name}
              categoryName={restaurant.category?.name}
            />
          ))}
        </div>
      </div>
      <div className=" grid grid-cols-3 text-center max-w-md items-center mx-auto  mb-5">
        {page > 1 ? (
          <button onClick={onClickPrevPage} className=" font-medium text-2xl">
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="text-xl hover:text-yellow-400"
            />
          </button>
        ) : (
          <div></div>
        )}
        <span className="mx-5">
          Page {page} of {data?.searchRestaurant.totalPages}
        </span>
        {page !== data?.searchRestaurant.totalPages ? (
          <button onClick={onClickNextPage} className=" font-medium text-2xl">
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="text-xl hover:text-yellow-400"
            />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
