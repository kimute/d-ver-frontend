import { gql, useMutation, useQuery } from '@apollo/client';
import { faHandPointUp } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleArrowRight,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { divide } from 'cypress/types/lodash';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';
import {
  DISH_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from '../../fragments';

import { useMehook } from '../../hooks/useMehook';
import {
  myRestaurant,
  myRestaurantVariables,
} from '../../__generated__/myRestaurant';
import {
  createPayment,
  createPaymentVariables,
} from '../../__generated__/createPayment';

const CREATE_PAYMENT = gql`
  mutation createPayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

interface IPrams {
  id: string;
}

export const Myrestaurant = () => {
  const { id } = useParams<IPrams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    },
  );
  const onCompleted = (data: createPayment) => {
    if (data.createPayment.ok) {
      alert('being promoted!');
    }
  };
  const [createPaymentMutation, { loading }] = useMutation<
    createPayment,
    createPaymentVariables
  >(CREATE_PAYMENT, {
    onCompleted,
  });

  const { data: userData } = useMehook();
  const onPaddle = () => {
    console.log('set paddle needed');
    if (userData?.me.email) {
      console.log(userData.me.email);

      // @ts-ignore
      //   window.Paddle.Setup({ vendor:  });
      //   // @ts-ignore
      //   window.Paddle.Checkout.open({
      //     product: ,
      //     email: userData.me.email,
      //     successCallback: (data: any) => {
      //       createPaymentMutation({
      //         variables: {
      //           input: {
      //             transactionId: data.checkout.id,
      //             restaurantId: +id,
      //           },
      //         },
      //       });
      //     },
      //   });
    }
  };

  return (
    <div>
      <Helmet>
        {data?.myRestaurant.restaurant?.name || 'Loading ...'} | D-liver
        <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
      </Helmet>
      <div className="checkedout"></div>
      <div
        className="py-28 bg-gray-700 bg-cover bg-center"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="mt-10 mx-5">
        <h2 className="text-4xl font-medium mb-10 text-gray-400">
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
        <Link
          to={`/restaurants/${id}/create-dish`}
          className="mr-5  text-white bg-gray-700 hover:bg-yellow-400 py-3 px-7"
        >
          ADD Dish
          <FontAwesomeIcon icon={faCircleArrowRight} className="text-xl pl-3" />
        </Link>
        <span
          onClick={onPaddle}
          className=" text-white bg-sky-600 hover:bg-yellow-400 py-3 px-4"
        >
          Get Promotion
          <FontAwesomeIcon icon={faCircleArrowRight} className="text-xl pl-3" />
        </span>
        <div className="mt-5">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <div className=" text-lg text-gray-400">
              Please Add a Dish <FontAwesomeIcon icon={faHandPointUp} />{' '}
            </div>
          ) : (
            <div className="grid mt-10 mb-3 md:grid-cols-3 gap-x-7 gap-y-10 2xl:w-10 text-sm">
              {data?.myRestaurant.restaurant?.menu.map(
                (dishs: any, index: any) => (
                  <Dish
                    key={index}
                    name={dishs.name}
                    description={dishs.description}
                    photo={dishs.photo}
                    price={dishs.price}
                    isClient={false}
                  />
                ),
              )}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium text-gray-500">
            Sales for this Year
          </h4>
          <div className="max-w-lg w-full mx-auto  border-gray-500">
            <VictoryChart
              height={400}
              width={700}
              theme={VictoryTheme.material}
              domainPadding={40}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `$${datum.y}`}
                labelComponent={
                  <VictoryLabel
                    style={{ fontSize: 30 }}
                    renderInPortal
                    dy={-20}
                  />
                }
                data={data?.myRestaurant.restaurant?.orders.map(
                  (order: any) => ({
                    x: order.createdAt,
                    y: order.total,
                  }),
                )}
                interpolation="natural"
                style={{
                  data: {
                    strokeWidth: 5,
                    stroke: ' #ffd43b',
                  },
                }}
              />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{
                  tickLabels: {
                    fontSize: 20,
                    fill: '#adb5bd',
                  },
                }}
                dependentAxis
                tickFormat={(tick) => `$${tick}`}
              />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{
                  tickLabels: {
                    fontSize: 20,
                    fill: '#adb5bd',
                  },
                }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString('ko')}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
