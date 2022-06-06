import { MockedProvider } from '@apollo/client/testing';

import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitFor, screen } from '@testing-library/react';

import React from 'react';

import { ME_QUERY } from '../../hooks/useMehook';

import { Header } from '../header';

describe('<Header />', () => {
  it('check header verify email banner', async () => {
    await waitFor(async () => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },

              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      screen.queryByText('Please verify your email.');
    });
  });

  it('check header  no verify email banner', async () => {
    await waitFor(async () => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },

              result: {
                data: {
                  me: {
                    id: 1,

                    email: '',

                    role: '',

                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );

      await new Promise((resolve) => setTimeout(resolve, 5));

      expect(screen.queryByText('Please verify your email.')).toBeNull();
    });
  });
});
