import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { CreateOrderItemInput } from '../../__generated__/globalTypes';
import {
  restaurant,
  restaurantVariables,
} from '../../__generated__/restaurant';
import { DishOption } from '../../components/dish-option';
import {
  createOrder,
  createOrderVariables,
} from '../../__generated__/createOrder';

const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
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
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const startOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find((item) => item.dishId === dishId);
  };

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };

  const addItemOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeOrder = (dishId: number) => {
    setOrderItems((item) =>
      item.filter((dishItems) => dishItems.dishId !== dishId),
    );
  };

  const addOptionItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption: any) => aOption.name === optionName),
      );
      if (!hasOption) {
        removeOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [{ name: optionName }, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };
  const getOptionItem = (item: CreateOrderItemInput, optionName: string) => {
    return item.options?.find((option: any) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionItem(item, optionName));
    }
    return false;
  };

  const removeOptionItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeOrder(dishId);
      setOrderItems((now) => [
        {
          dishId,
          options: oldItem.options?.filter(
            (option: any) => option.name !== optionName,
          ),
        },
        ...now,
      ]);
    }
  };

  const cancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const history = useHistory();
  const onCompleted = (data: createOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (data.createOrder.ok) {
      history.push(`/orders/${orderId}`);
    }
  };

  const [createOrderMutation, { loading: readyToOrder }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER, {
    onCompleted,
  });

  const confirmOrder = () => {
    if (readyToOrder) {
      return;
    }
    if (orderItems.length === 0) {
      alert('Empty order please make sure your Order.');
      return;
    }
    const resultOk = window.confirm('Your Order confirmed');
    if (resultOk) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +params.id,
            items: orderItems,
          },
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ''} | D-liver</title>
      </Helmet>
      <div
        className='"py-28 bg-gray-700 bg-cover bg-center'
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="py-28 pl-5">
          <div className="bg-white w-4/12  md:w-2/12 flex flex-col justify-center">
            <h4 className=" text-xl px-2 mb-3 mt-3">
              {data?.restaurant.restaurant?.name}
            </h4>
            <h5 className="px-2 text-green-600 text-sm">
              {data?.restaurant.restaurant?.category?.name}
            </h5>
            <h6 className="px-2 text-xs text-gray-400 mb-3">
              {data?.restaurant.restaurant?.address}
            </h6>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-10 mx-5 w-50">
          {!orderStarted && (
            <button
              onClick={startOrder}
              className={`order-btn w-full md:w-40 text-sm ${
                orderStarted ? 'bg-yellow-400 cursor-none' : ''
              }`}
            >
              Order Start
            </button>
          )}
          {orderStarted && (
            <div className="md:flex ">
              <button
                onClick={confirmOrder}
                className="order-btn w-full md:w-40 text-sm mb-2 bg-yellow-400 hover:bg-black hover:text-white"
              >
                Confirm
              </button>
              <button
                onClick={cancelOrder}
                className="order-btn w-full md:w-40 text-sm  mb-2 md:ml-2 hover:bg-black hover:text-red-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="grid mt-10 mb-3 md:grid-cols-3 gap-x-7 gap-y-10 2xl:w-10 px-5 text-sm">
          {data?.restaurant.restaurant?.menu.map((dishs: any, index: any) => (
            <Dish
              id={dishs.id}
              isSelected={isSelected(dishs.id)}
              orderStarted={orderStarted}
              name={dishs.name}
              description={dishs.description}
              photo={dishs.photo}
              price={dishs.price}
              isClient={true}
              options={dishs.options}
              addItemOrder={addItemOrder}
              removeOrder={removeOrder}
            >
              {dishs.options?.map((option: any, index: any) => (
                <DishOption
                  key={index}
                  dishId={dishs.id}
                  isSelected={isOptionSelected(dishs.id, option.name)}
                  name={option.name}
                  extra={option.extra}
                  addOptionItem={addOptionItem}
                  removeOptionItem={removeOptionItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
