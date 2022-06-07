/* eslint-disable testing-library/no-wait-for-side-effects */
import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { render, RenderResult, waitFor, screen } from '@testing-library/react';
import React from 'react';
import { Login, LOGIN_MUTATION } from '../Login';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<Login/>', () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>,
      );
    });
  });
  it('check login render', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Login | D-liver');
    });
  });

  it('check email validation errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    // eslint-disable-next-line testing-library/prefer-screen-queries

    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, 'test@test');
    });
    let errorMessage = getByRole('alert');

    expect(errorMessage).toHaveTextContent('Please enter a valid email');
    await waitFor(() => {
      userEvent.clear(email);
    });
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });
  it('check password  required errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole('button');
    await waitFor(() => {
      userEvent.type(email, 'test@test');
      userEvent.click(submitBtn);
    });
    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });

  it('check submits form & calls m  utation', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const formData = {
      email: 'test@test.com',
      password: '123',
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'testtoken',
          error: 'error',
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, 'setItem');
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
    expect(localStorage.setItem).toHaveBeenCalledWith('nuber-token', 'XXX');
  });
});
