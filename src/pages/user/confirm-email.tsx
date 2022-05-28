import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMehook } from '../../hooks/useMehook';
import {
  verifyEmail,
  verifyEmailVariables,
} from '../../__generated__/verifyEmail';

const VERIFY_EMAIL = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;
export const ConfirmEmail = () => {
  // userData <- renamed date
  const { data: userData } = useMehook();
  const history = useHistory();
  const client = useApolloClient(); //for use writeFragment
  //verfyEmail : interface
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      //get id from cash and change state of verifing email
      // User: from DB
      // target -> verified of data
      // data:{ verified } <-new data,it will be changed
      // fragment is part od User
      client.writeFragment({
        id: `User:${userData?.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push('/');
    }
  };

  //verfyEmail: func()
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL,
    {
      onCompleted,
    },
  );
  useEffect(() => {
    const [_, code] = window.location.href.split('code=');
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, [verifyEmail]);
  return (
    <div className="mt-70 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming Email ...</h2>
      <h4 className="text-yellow-500">Please wait..</h4>
    </div>
  );
};
