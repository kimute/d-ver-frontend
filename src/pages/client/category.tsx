import { gql, useQuery } from '@apollo/client';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Restaurant } from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__generated__/category';

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategory {
  slug: string;
}

export const Category = () => {
  const [page, setPage] = useState(1);
  // here use useParams instead of useLocation
  // and do not need to use useEffect
  const params = useParams<ICategory>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: page,
          slug: params.slug,
        },
      },
    },
  );
  const onClickNextPage = () => setPage((page) => page + 1);
  const onClickPrevPage = () => setPage((page) => page - 1);
  return (
    <div>
      <Helmet>
        <title>Category | D-liver</title>
      </Helmet>
      <div className="py-20 bg-gray-700 h-3 flex items-center justify-center">
        <div
          style={{
            backgroundImage: `url(${data?.category.category?.coverImage})`,
          }}
          className="w-20 h-20 bg-gray-100 rounded-full bg-cover bg-center "
        ></div>
        <div className="flex flex-col items-center ml-2 ">
          <h1 className=" text-xl text-green-500">
            {data?.category.category?.name}
          </h1>
          <span className=" mt-3 text-white hover:text-yellow-400 text-sm">
            <Link to={`/`}>
              see another <FontAwesomeIcon icon={faCircleArrowRight} />
            </Link>
          </span>
        </div>
      </div>
      {!loading && (
        <>
          <div className="grid mt-10 mb-3 md:grid-cols-3 gap-x-7 gap-y-10 2xl:w-10 px-2 text-sm">
            {data?.category.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ''}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className=" grid grid-cols-3 text-center max-w-md items-center mx-auto mb-10">
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
              Page {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages ? (
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
        </>
      )}
    </div>
  );
};
