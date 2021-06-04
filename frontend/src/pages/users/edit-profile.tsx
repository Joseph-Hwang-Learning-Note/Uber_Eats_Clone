import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { editProfile, editProfileVariables } from 'src/api/editProfile';
import Button from 'src/components/button';
import { EMAIL_VALIDATOR } from 'src/constants';
import { useMe } from 'src/hooks/useMe';


const EDIT_PROFILE_MUTATION = gql`
    mutation editProfile($input: EditProfileInput!) {
        editProfile(input: $input) {
            ok
            error
        }
    }
`;

interface FormProps {
    email?: string;
    password?: string;
}

const EditProfile: React.FC = () => {

  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    const { editProfile: { ok } } = data;
    if (ok && userData) {
      const { me: { email: oldEmail, id } } = userData;
      const { email: newEmail } = getValues();
      if ( oldEmail !== newEmail ) {
        client.writeFragment({
          id: `Users:${id}`,
          fragment: gql`
                    fragment EditedUser on Users {
                        verified
                        email
                    }
                `,
          data: {
            email: newEmail,
            verified: false
          }
        });
      }
    }
  };
  const [ editProfile, { loading } ] = useMutation<
      editProfile, 
      editProfileVariables
      >(EDIT_PROFILE_MUTATION, {
        onCompleted
      });
  const { register, handleSubmit, getValues, formState: { isValid } } = useForm<FormProps>({
    mode:'onChange',
    defaultValues: {
      email: userData?.me.email,
    }
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password })
        }
      }
    });
  };

  return (
    <div className="mt-52 col-center max-w-screen-sm mx-auto">
      <h4>Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 my-5 w-full"
      >
        <input
          {...register('email', {
            pattern: EMAIL_VALIDATOR
          })}
          name='email'
          type="email"
          placeholder="Email"
          className="input"
          required
        ></input>
        <input
          {...register('password')}
          name='password'
          type="password"
          placeholder="Password"
          className="input"
        ></input>
        <Button 
          loading={loading}
          canClick={isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};

export default EditProfile;
