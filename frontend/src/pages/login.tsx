import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginMutation, LoginMutationVariables } from 'src/api/LoginMutation';
import FormError from 'src/components/form-error';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password:String!) {
    login(input: {
      email: $email,
      password: $password
    }) {
      ok,
      token,
      error
    }
  }
`

interface LoginForm {
    email?: string;
    password?: string;
}

const Login: React.FC = () => {
  const { register, getValues, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [ loginMutation, { loading, error, data } ] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION)

  const onSubmit = () => {
    const { email, password } = getValues();
    if ( email && password ) {
      loginMutation({
        variables: {
          email, 
          password,
        }
      })
    }
  }
    
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center">
        <h3 className="font-bold text-3xl text-gray-800"></h3>
        <form className="grid gap-3 mt-5 px-5" onSubmit={onSubmit}>
          <input 
            {...register('email' , { required: 'Email is required' })}
            name="email"
            type="email"
            placeholder="Email" 
            className="input"
          />
          { errors.email?.message && <FormError errorMessage={errors.email?.message} /> }
          <input 
            {...register('password' , { required: 'Password is required' })}
            name="password"
            type="password"
            placeholder="Password" 
            className="input"
          />
          { errors.password?.message && <FormError errorMessage={errors.password?.message} /> }
          <button className="btn mt-3">
              Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
