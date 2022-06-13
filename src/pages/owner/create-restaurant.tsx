import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import {
  createRestaurant,
  createRestaurantVariables,
} from '../../__generated__/createRestaurant';
import { MY_RESTAURANTS } from './my-restaurants';

const CREATE_RESTAURANT = gql`
  mutation createRestaurant($input: CreateReataurantInput!) {
    createReataurant(input: $input) {
      error
      ok
      restaurantId
    }
  }
`;

interface IForm {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const CreateRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState('');
  const onCompleted = (data: createRestaurant) => {
    const {
      createReataurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { name, categoryName, address } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS });
      client.writeQuery({
        query: MY_RESTAURANTS,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: 'Category',
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: 'Restaurant',
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push('/');
    }
  };
  const [createRestaurant, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT, {
    onCompleted,
  });
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IForm>({
    mode: 'onChange',
  });
  const [uploading, setUploading] = useState(false);
  const [value, setValue] = useState('');
  const onChange = (e: any) => setValue(e.target.value);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append('file', actualFile);
      const { url: coverImg } = await (
        await fetch('http://localhost:4000/uploads/', {
          method: 'POST',
          body: formBody,
        })
      ).json();
      setImageUrl(coverImg);
      createRestaurant({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container h-screen flex justify-center mt-20 lg:mt-30">
      <Helmet>
        <title>Create Restaurant | D-liver</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center ">
        <h1 className='"w-full font-medium text-gray-500 mt-0 text-left text-3xl mb-5'>
          Create Restaurant
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full"
        >
          <input
            {...register('name', {
              required: 'Restaurant name is required',
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
            {...register('address', {
              required: ' address is required',
            })}
            className="input"
            type="text"
            name="address"
            placeholder="Address"
          />
          {errors.address?.message && (
            <FormError errorMessage={errors.address.message} />
          )}
          <input
            {...register('categoryName', {
              required: 'categor name is required',
            })}
            className="input"
            type="text"
            name="categoryName"
            placeholder="Category name"
          />
          {errors.categoryName?.message && (
            <FormError errorMessage={errors.categoryName.message} />
          )}
          <label
            htmlFor="input-file"
            onChange={onChange}
            className="  flex items-center justify-center w-full text-lg font-medium focus:outline-none text-white py-3 px-5 rounded-lg bg-gray-400 hover:bg-yellow-400 cursor-pointer "
          >
            {value === '' ? 'File Upload (jpeg,png..)' : value}
            <input
              {...register('file', {
                required: 'Image file is required',
              })}
              className="hidden "
              id="input-file"
              type="file"
              name="file"
              placeholder="file upload"
              accept="image/*"
            />
          </label>
          {errors.file?.message && (
            <FormError errorMessage={errors.file.message} />
          )}
          <Button
            loading={uploading}
            clickOk={isValid}
            actionText={'Create Restaurant'}
          />
        </form>
      </div>
    </div>
  );
};
