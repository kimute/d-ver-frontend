import { gql, useQuery } from '@apollo/client';
import {
  faCircleArrowRight,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { myRestaurants } from '../../__generated__/myRestaurants';
import { Restaurant } from '../../components/restaurant';

export const MY_RESTAURANTS = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
export const MyRestaurants = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS);
  console.log(data);

  return (
    <div>
      <Helmet>
        <title>My Restaurants | D-liver </title>
      </Helmet>
      <div>
        <div className="py-20 bg-gray-700 h-3 flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faHouse}
              className=" text-gray-300 text-2xl"
            />
            <h2 className="text-4xl font-medium text-white">My Restaurants</h2>
          </div>

          <span className="text-white mt-3">
            Open for Business: {data?.myRestaurants.restaurants.length}
          </span>
          {data?.myRestaurants.ok &&
            data.myRestaurants.restaurants.length !== 0 && (
              <Link to="/create-restaurant">
                <div className=" flex link text-sm mt-3 text-gray-400">
                  create more Restaurant ?
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="text-xl pl-3"
                  />
                </div>
              </Link>
            )}
        </div>
        {data?.myRestaurants.ok &&
        data.myRestaurants.restaurants.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center mt-10 mb-3  w-full 2xl:w-10 px-2 text-sm">
              <h4 className=" text-gray-400 text-xl mb-5">
                You have no Restaurants here.
              </h4>
              <Link to="/create-restaurant">
                <div className="link">
                  Create Restaurant ?
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="text-xl pl-3"
                  />
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div className="grid mt-10 mb-3  w-full md:grid-cols-3 gap-x-7 gap-y-10 2xl:w-10 px-2 text-sm">
            {data?.myRestaurants.restaurants.map((restaurant: any) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ''}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
