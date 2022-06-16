import { gql, useQuery } from '@apollo/client';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Category } from '../../components/category';
import { Restaurant } from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ISearchForm {
  searchTerm: string;
}
export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: page,
      },
    },
  });
  const onClickNextPage = () => setPage((page) => page + 1);
  const onClickPrevPage = () => setPage((page) => page - 1);
  const { register, handleSubmit, getValues } = useForm<ISearchForm>();
  const history = useHistory();
  const onSearch = () => {
    console.log(getValues());
    const { searchTerm } = getValues();
    history.push({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | D-liver</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearch)}
        className=" py-40 flex items-center justify-center bg-no-repeat bg-cover h-20 bg-gray-400 "
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2014/06/11/17/00/food-366875__480.jpg')`,
        }}
      >
        <input
          {...register('searchTerm', {
            required: true,
          })}
          name="searchTerm"
          type="search"
          className="input w-3/4 md:w-4/12"
          placeholder="Search Restaurant..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-xl mx-auto mt-8 pb-20">
          <div className="flex justify-around max-w-sm mx-auto ">
            {data?.allCategories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <Category category={category} />
              </Link>
            ))}
          </div>
          <div className="grid mt-10 mb-3 md:grid-cols-3 gap-x-7 gap-y-10 2xl:w-10 px-2 text-sm">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ''}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className=" grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onClickPrevPage}
                className=" font-medium text-2xl"
              >
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="text-xl hover:text-yellow-400"
                />
              </button>
            ) : (
              <div></div>
            )}
            <span className="mx-5">
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onClickNextPage}
                className=" font-medium text-2xl"
              >
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
      )}
    </div>
  );
};
