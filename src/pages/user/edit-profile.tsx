import { gql, useApolloClient, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { useMehook } from '../../hooks/useMehook';
import {
  editProfile,
  editProfileVariables,
} from '../../__generated__/editProfile';

const EDIT_PROFILE = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData, refetch } = useMehook();
  const client = useApolloClient();
  const onCompleted = async (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        //update cache
        await refetch(); // this way is simple but call API again
        // The Way below is faster
        // client.writeFragment({
        //   id: `User:${id}`,
        //   fragment: gql`
        //     fragment EditedUser on User {
        //       verified
        //       email
        //     }
        //   `,
        //   data: {
        //     email: newEmail,
        //     verified: false,
        //   },
        // });
      }
    }
  };
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }),
        },
      },
    });
  };
  return (
    <div className=" mt-52 px-5 xl:px-0 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | D-liver</title>
      </Helmet>
      <h4 className=" font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 w-full mt-5 mb-5"
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          className="input"
          type="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <FormError errorMessage={errors.email.message} />
        )}
        {errors.email?.type === 'pattern' && (
          <FormError errorMessage={'Please enter a valid email'} />
        )}
        <input
          {...register('password')}
          name="password"
          className="input"
          type="password"
          placeholder="Password"
        />
        {/* {errors.password?.message && (
          <FormError errorMessage={errors.password.message} />
        )}
        {errors.password?.type === 'minLength' && (
          <FormError errorMessage="Password is too short" />
        )} */}

        <Button loading={loading} clickOk={isValid} actionText="Save Profile" />
      </form>
    </div>
  );
};
