import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { FULL_ORDER_FRAGMENT } from '../fragments';
import { useMehook } from '../hooks/useMehook';
import { editOrder, editOrderVariables } from '../__generated__/editOrder';
import { getOrder, getOrderVariables } from '../__generated__/getOrder';
import { orderUpdates } from '../__generated__/orderUpdates';
import { OrderStatus, UserRole } from '../__generated__/globalTypes';

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

interface IOder {
  id: string;
}

const EDIT_ORDER = gql`
  mutation editOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;

export const Order = () => {
  const params = useParams<IOder>();
  const { data: userData } = useMehook();
  const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(
    EDIT_ORDER,
  );

  const { data, subscribeToMore } = useQuery<getOrder, getOrderVariables>(
    GET_ORDER,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    },
  );
  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: +params.id,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: orderUpdates } },
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);

  const onClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: {
        input: {
          id: +params.id,
          status: newStatus,
        },
      },
    });
  };

  return (
    <div className="mt-10 w-full max-w-screen-xl flex justify-center items-center ">
      <Helmet>
        <title>Order:${params.id} | D-liver</title>
      </Helmet>
      <div className="border border-gray-300 w-full mx-5 mb-3 max-w-screen-sm flex flex-col justify-center">
        <h4 className="bg-gray-400 w-full py-5 text-white text-center text-xl">
          Order Nr.{params.id}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center ">
          ${data?.getOrder.order?.total}
        </h5>
        <div className="p-5 text-xl grid gap-5">
          <div className="border-t pt-5 border-gray-500">
            Restaurant:{' '}
            <span className="font-medium text-yellow-500">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className=" pt-5  ">
            Deliver To:{' '}
            <span className="font-medium text-yellow-500">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>
          <div className=" border-b py-5 border-gray-500">
            Driver:{' '}
            <span
              className={`font-medium ${
                data?.getOrder.order?.driver?.email
                  ? 'text-yellow-500'
                  : 'text-gray-400'
              }`}
            >
              {data?.getOrder.order?.driver?.email || 'Searching Driver..'}
            </span>
          </div>
          {userData?.me.role === UserRole.Client && (
            <span className=" text-center py-5 text-xl text-green-600">
              Status: {data?.getOrder.order?.status}
            </span>
          )}
          {userData?.me.role === UserRole.Owner && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Pending && (
                <button
                  onClick={() => onClick(OrderStatus.Cooking)}
                  className="btn"
                >
                  Accept
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.Cooking && (
                <button
                  onClick={() => onClick(OrderStatus.Cooked)}
                  className="btn"
                >
                  Cooked
                </button>
              )}
            </>
          )}
          {data?.getOrder.order?.status !== OrderStatus.Cooking &&
            data?.getOrder.order?.status !== OrderStatus.Pending && (
              <span className=" text-center py-5 text-xl text-green-600">
                Status: {data?.getOrder.order?.status}
              </span>
            )}
          {userData?.me.role === UserRole.Delivery && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Cooked && (
                <button
                  onClick={() => onClick(OrderStatus.PickedUp)}
                  className="btn"
                >
                  Picked Up
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.PickedUp && (
                <button
                  onClick={() => onClick(OrderStatus.Delivered)}
                  className="btn"
                >
                  Order Delivered
                </button>
              )}
            </>
          )}
          {data?.getOrder.order?.status === OrderStatus.Delivered && (
            <span className=" text-center mt-5 mb-3  text-2xl text-yellow-400">
              Thank you for using D-liver
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
