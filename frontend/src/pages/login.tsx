import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginMutation, LoginMutationVariables } from 'src/api/LoginMutation';
import Logo from 'src/img/logo.svg';
import FormError from 'src/components/form-error';
import Button from 'src/components/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { authToken, isLoggedInVar } from 'src/apollo';
import { LOCALSTORAGE_TOKEN } from 'src/constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok,
      token,
      error
    }
  }
`;

interface LoginForm {
    email?: string;
    password?: string;
}

const Login: React.FC = () => {
  const { 
    register, 
    getValues, 
    formState: { 
      errors, 
      isValid 
    } 
  } = useForm<LoginForm>({
    mode: 'onChange'
  });
  const onCompleted = (data: LoginMutation) => {
    const { login: { ok, token } } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };
  const [ loginMutation, { data: loginMutationResult, loading } ] = useMutation<
    LoginMutation, 
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      let { email, password } = getValues();
      email = email || '';
      password = password || '';
      loginMutation({
        variables: {
          loginInput: {
            email,
            password
          }
        }
      });
    }
  };
    
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={Logo} className="w-52 mb-5" />
        <form className="grid gap-3 my-5 w-full" onSubmit={onSubmit}>
          <h4 className="text-left w-full text-3xl font-medium">Welcome back</h4>
          <input 
            {...register('email' , { 
              required: 'Email is required', 
              minLength: 1,
              // eslint-disable-next-line
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
          <Button 
            canClick={isValid}
            loading={loading}
            actionText="Log In"
          />
          { loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} /> }
        </form>
        <div>
          New to Nuber?{' '} <Link to="/create-account" className="text-lime-600 hover:underline">Create an Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
