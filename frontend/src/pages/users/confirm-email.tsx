import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { verifyEmail, verifyEmailVariables } from 'src/api/verifyEmail';
import { useMe } from 'src/hooks/useMe';


const VERIFY_EMAIL_MUATION = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
            ok
            error
        }
    }
`;


const ConfirmEmail: React.FC = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();

  const onCompleted = (data: verifyEmail) => {
    const { verifyEmail: { ok } } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `Users:${userData?.me.id}`,
        fragment: gql`
            fragment VerifiedUser on Users {
                verified
            }
        `,
        data: {
          verified: true
        }
      });
      history.push('/');
    }
  };

  const [ verifyEmail ] = useMutation<
        verifyEmail, 
        verifyEmailVariables
    >(VERIFY_EMAIL_MUATION, {
      onCompleted
    });

  const location = useLocation();

  useEffect(() => {
    const { search } = location;
    const [ _, code ] = search.split('code=');
    verifyEmail({
      variables: {
        input: {
          code
        }
      }
    });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">Please wait, don&apos;t close this page</h4>
    </div>
  );
};

export default ConfirmEmail;
