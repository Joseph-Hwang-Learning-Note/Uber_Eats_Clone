import { QueryResult, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { meQuery } from 'src/api/meQuery';

const ME_QUERY = gql`
    query meQuery {
        me {
            id
            email
            role
            verified
        }
    }
`;

export const useMe = (): QueryResult<meQuery> => {
  return useQuery<meQuery>(ME_QUERY); // We got refetch here, which literally refetches to the query we fetched
};