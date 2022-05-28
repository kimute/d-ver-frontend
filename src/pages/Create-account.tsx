import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import logo from '../images/title-logo.svg';
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '../__generated__/createAccountMutation';
import { UserRole } from '../__generated__/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountform {
  email: string;
  password: string;
  role: UserRole;
}

function CreateAccount() {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountform>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert('Your Account created! Please Login now');
      history.push('/');
    }
  };
  const [createAccountMutation, { loading, data: createAccountResult }] =
    useMutation<createAccountMutation, createAccountMutationVariables>(
      CREATE_ACCOUNT_MUTATION,
      {
        onCompleted,
      },
    );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-30">
      <Helmet>
        <title>Create Account | D-liver</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img alt="D-liver" src={logo} className=" w-60 mb-20" />
        <h4 className="w-full font-medium text-gray-500 text-left text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full"
        >
          <input
            {...register('email', {
              required: 'Email is required',
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input mb-2 text-a"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage={'Please enter a valid email'} />
          )}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: 10,
            })}
            name="password"
            type="password"
            placeholder="password"
            className="input mb-2"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password is too short" />
          )}
          <select
            {...register('role', {
              required: true,
            })}
            className="input"
            name="role"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            clickOk={isValid}
            loading={false}
            actionText={'Create Account'}
          />

          {createAccountResult?.createAccount.error && (
            <FormError errorMessage={createAccountResult.createAccount.error} />
          )}
        </form>
        <div className=" mt-3">
          Already have an account?{' '}
          <Link to="/" className=" text-yellow-500 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
