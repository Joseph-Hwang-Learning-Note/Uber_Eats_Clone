import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormError from 'src/components/form-error';
import Button from 'src/components/button';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { UserRole } from 'src/api/globalTypes';
import { createAccountMutation, createAccountMutationVariables } from 'src/api/createAccountMutation';
import Logo from 'src/components/logo';
import { EMAIL_VALIDATOR } from 'src/constants';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok,
      error
    }
  }
`;

interface CreateAccountForm {
    email?: string;
    password?: string;
    role: UserRole;
}

const CreateAccount: React.FC = () => {
  const { 
    register, 
    getValues, 
    formState: { 
      errors, 
      isValid 
    },
    handleSubmit
  } = useForm<CreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client
    }
  });

  const history = useHistory();
  const onCompleted = (data: createAccountMutation): void => {
    const { createAccount: { ok } } = data;
    if (ok) {
      alert('Account Created! Log in now!');
      history.push('/login');
    }
  };

  const [ createAccountMutation, { loading, data: createAccountMutationResult } ] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted
  });

  const onSubmit = (): void => {
    if (!loading) {
      // eslint-disable-next-line
      const { email, password, role } = getValues();

      if ( email && password ) {
        createAccountMutation({
          variables: {
            createAccountInput: {
              email, password, role
            }
          }
        });
      }
    }
  };
    
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <Logo className="w-52 mb-5" />
        <form className="grid gap-3 my-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text-left w-full text-3xl font-medium">Let&apos;s get started!</h4>
          <input 
            {...register('email' , { 
              required: 'Email is required', 
              minLength: 1, 
              pattern: EMAIL_VALIDATOR
            })}
            name="email"
            type="email"
            placeholder="Email" 
            className="input"
          />
          { errors.email?.message && <FormError errorMessage={errors.email?.message} /> }
          { errors.email?.type && <FormError errorMessage="Please enter a valid email" /> }
          <input 
            {...register('password' , { required: 'Password is required', minLength: 1 })}
            name="password"
            type="password"
            placeholder="Password" 
            className="input"
          />
          { errors.password?.message && <FormError errorMessage={errors.password?.message} /> }
          <select 
            {...register('role', { required: true })}
            className="input"
            name="role"
          >
            {
              Object.keys(UserRole).map( ( role, index ) => (
                <option key={index}>{role}</option>
              ))
            }
          </select>
          <Button 
            canClick={isValid}
            loading={false}
            actionText="Create Account"
          />
          { createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult.createAccount.error} /> }
        </form>
        <div>
          Already have an account?{' '} <Link to="/login" className="text-lime-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

