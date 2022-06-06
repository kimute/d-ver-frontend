import { gql, useQuery } from '@apollo/client';
import { meQuery } from '../__generated__/meQuery';

//this hook is for direc access to cash 
export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMehook = () => {
  return useQuery<meQuery>(ME_QUERY);
};
