import React from 'react';
import { useForm } from 'react-hook-form';

interface LoginForm {
    email?: string;
    password?: string;
}

function Login(): JSX.Element {
  const { register, getValues, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = (): void => { return; };
    
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center">
        <h3 className="font-bold text-3xl text-gray-800"></h3>
        <form className="grid gap-3 mt-5 px-5">
          <input 
            {...register('email' , { required: 'Email is required' })}
            name="email"
            type="email"
            placeholder="Email" 
            className="input"
          />
          { errors.email?.message && <span className="font-medium text-red-500">{errors.email?.message}</span> }
          <input 
            {...register('password' , { required: 'Password is required' })}
            name="password"
            type="password"
            placeholder="Password" 
            className="input"
          />
          { errors.password?.message && <span className="font-medium text-red-500">{errors.password?.message}</span> }
          <button className="btn mt-3">
              Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
