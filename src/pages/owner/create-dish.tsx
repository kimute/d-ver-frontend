import { gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import {
  createDish,
  createDishVariables,
} from '../../__generated__/createDish';
import { MY_RESTAURANT_QUERY } from './my-restaurant';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

export const CreateDish = () => {
  const { restaurantId } = useParams<IParams>();
  console.log(restaurantId);
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    setValue,
  } = useForm<IForm>({
    mode: 'onChange',
  });
  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    console.log('rest', rest);
    const optionObjects = optionsNumber.map((optionsId) => ({
      name: rest[`${optionsId}-optionName`],
      extra: +rest[`${optionsId}-optionExtra`],
    }));
    console.log(optionObjects);
    try {
      const { name, price, description } = getValues();
      createDishMutation({
        variables: {
          input: {
            name,
            price: +price,
            description,
            restaurantId: +restaurantId,
            options: optionObjects,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    history.push('/');
  };

  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  console.log('optionsNumber', optionsNumber);

  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
    // @ts-ignore
    setValue(`${idToDelete}-optionName`, '');
    // @ts-ignore
    setValue(`${idToDelete}-optionExtra`, '');
  };
  return (
    <div className="flex items-center flex-col mt-10 lg:mt-30">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="font-semibold  w-full text-2xl text-center mb-3">
          Add Dish
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
          name="createDisah"
        >
          <input
            {...register('name', {
              required: 'Name is required.',
            })}
            className="input"
            type="text"
            name="name"
            placeholder="Name"
          />
          {errors.name?.message && (
            <FormError errorMessage={errors.name.message} />
          )}
          <input
            {...register('price', {
              required: 'price is required',
            })}
            className="input"
            type="number"
            name="price"
            min={0}
            placeholder="Price"
          />
          {errors.price?.message && (
            <FormError errorMessage={errors.price.message} />
          )}
          <input
            {...register('description', {
              required: 'description is required',
            })}
            className="input"
            type="text"
            name="description"
            placeholder="Description more than 5 characters"
          />
          {errors.description?.message && (
            <FormError errorMessage={errors.description.message} />
          )}
          <div className="my-3 w-full">
            <h4 className="font-medium mb-3 py-3 text-center border-b-2  border-gray-400">
              Dish Options
            </h4>
            <div
              onClick={onAddClick}
              className="bg-gray-400 text-white mt-3 mb-3 py-3 px-3 text-center text-lg rounded-lg font-medium hover:bg-yellow-400 cursor-pointer"
            >
              Add Option
            </div>
            {optionsNumber.length !== 0 &&
              optionsNumber.map((id) => (
                <div
                  key={id}
                  className="mt-5 flex w-full justify-center items-center"
                >
                  <input
                    {...register(`${id}-optionName`)}
                    type="text"
                    className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                    placeholder="Option Name"
                  />
                  <input
                    {...register(`${id}-optionExtra`)}
                    type="number"
                    className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                    placeholder="Option Extra"
                  />
                  <span
                    onClick={() => onDeleteClick(id)}
                    className="felx items-center justify-center cursor-pointer hover:text-red-600"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                </div>
              ))}
          </div>
          <Button
            loading={loading}
            clickOk={isValid}
            actionText="Create Dish"
          />
        </form>
      </div>
    </div>
  );
};
