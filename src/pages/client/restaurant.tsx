import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  restaurant,
  restaurantVariables,
} from '../../__generated__/restaurant';

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
interface IRestaurant {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurant>();
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    },
  );
  console.log(data);

  return (
    <div>
      <div
        className='"py-28 bg-gray-700 bg-cover bg-center'
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="py-28 pl-3">
          <div className="bg-white w-4/12  md:w-2/12 flex flex-col justify-center">
            <h4 className=" text-xl px-2 mb-3 mt-3">
              {data?.restaurant.restaurant?.name}
            </h4>
            <h5 className="px-2 text-green-700 text-sm">
              {data?.restaurant.restaurant?.category?.name}
            </h5>
            <h6 className="px-2 text-xs text-gray-400 mb-3">
              {data?.restaurant.restaurant?.address}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};
