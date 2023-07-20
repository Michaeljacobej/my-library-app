import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Helmet} from 'react-helmet';
import {SubmitHandler, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import AuthLogo from '@/components/AuthLogo';
import AuthSectionLeft from '@/components/AuthSectionLeft';
import ButtonThemeToggler from '@/components/ButtonThemeToggler';
import LoadingButtonPlaceholder from '@/components/LoadingButtonPlaceholder';
import useAuthCheck from '@/hooks/useAuthCheck';
import {doRegister} from '@/store/reducers/auth';

type RegisterInputs = {
  username: string;
  fullname: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {checkRegisteredUser} = useAuthCheck();
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<RegisterInputs>();

  const togglePassword = React.useCallback(() => {
    setShowPassword(state => !state);
  }, []);

  const onSubmit: SubmitHandler<RegisterInputs> = React.useCallback(
    async data => {
      await new Promise<void>(resolve => {
        setTimeout(async () => resolve(), 2000);
      });
      const foundUser = checkRegisteredUser(data.email, data.username);
      if (foundUser.success) {
        dispatch(doRegister(data));
        navigate('/login');
        toast.success('Register success', {
          position: 'top-right',
          className:
            'bg-green-200 dark:bg-green-700 text-black dark:text-white',
        });
        return;
      }
      if (foundUser.error?.email) {
        setError('email', {message: foundUser.error?.email, type: 'value'});
      }
      if (foundUser.error?.username) {
        setError('username', {
          message: foundUser.error?.username,
          type: 'value',
        });
      }
    },
    []
  );

  return (
    <>
      <Helmet>
        <title>Register to Library App</title>
      </Helmet>
      <main className="flex min-h-screen">
        <AuthSectionLeft />
        <section
          id="right"
          className="flex flex-1 flex-col justify-between transition-all dark:bg-dark-surface md:flex-[2]">
          <div className="mx-4 my-4 flex items-center justify-between">
            <AuthLogo />
            <ButtonThemeToggler />
          </div>
          <div className="md:mx-18 mx-6">
            <h1 className="pb-2 text-4xl font-bold text-light-gray dark:text-lighter-gray md:text-5xl">
              Register
            </h1>
            <h2 className="text-sm font-semibold text-light-gray dark:text-lighter-gray md:text-base">
              Welcome, Please Register
              <br />
              to create your Account
            </h2>
            <form
              className="mt-10 flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <input
                  type="text"
                  aria-invalid={errors.username && 'true'}
                  className={`peer w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:pt-7 focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 aria-[invalid]:text-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10 dark:aria-[invalid]:text-red-500 ${
                    watch('username') ? 'pt-7' : ''
                  }`}
                  {...register('username', {
                    required: 'Username is required',
                    pattern: {
                      value: /^[A-Za-z][A-Za-z0-9_]{4,20}$/,
                      message: 'Username is not valid',
                    },
                  })}
                />
                <label
                  htmlFor="username"
                  className={`pointer-events-none absolute top-0 bottom-0 left-3 flex items-center text-sm font-semibold text-lighter-gray transition-all peer-focus:-translate-y-[18%] peer-focus:text-black peer-aria-[invalid]:text-red-500 dark:peer-focus:text-white ${
                    watch('username') ? '-translate-y-[18%]' : ''
                  }`}>
                  Username
                </label>
              </div>
              {errors.username && (
                <span className="text-xs text-red-500">
                  {errors.username.message}
                </span>
              )}
              <div className="relative">
                <input
                  type="text"
                  aria-invalid={errors.fullname && 'true'}
                  className={`peer w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:pt-7 focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 aria-[invalid]:text-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10 dark:aria-[invalid]:text-red-500 ${
                    watch('fullname') ? 'pt-7' : ''
                  }`}
                  {...register('fullname', {
                    required: 'Fullname is required',
                    minLength: {
                      message: 'Fullname must be between 4 and 32',
                      value: 4,
                    },
                    maxLength: {
                      message: 'Fullname must be between 4 and 32',
                      value: 32,
                    },
                  })}
                />
                <label
                  htmlFor="fullname"
                  className={`pointer-events-none absolute top-0 bottom-0 left-3 flex items-center text-sm font-semibold text-lighter-gray transition-all peer-focus:-translate-y-[18%] peer-focus:text-black peer-aria-[invalid]:text-red-500 dark:peer-focus:text-white ${
                    watch('fullname') ? '-translate-y-[18%]' : ''
                  }`}>
                  Full Name
                </label>
              </div>
              {errors.fullname && (
                <span className="text-xs text-red-500">
                  {errors.fullname.message}
                </span>
              )}
              <div className="relative">
                <input
                  type="email"
                  aria-invalid={errors.email && 'true'}
                  className={`peer w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:pt-7 focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 aria-[invalid]:text-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10 dark:aria-[invalid]:text-red-500 ${
                    watch('email') ? 'pt-7' : ''
                  }`}
                  {...register('email', {
                    required: 'Email Address is required',
                    pattern: {
                      value: /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
                      message: 'Email must be a valid email',
                    },
                  })}
                />
                <label
                  htmlFor="email"
                  className={`pointer-events-none absolute top-0 bottom-0 left-3 flex items-center text-sm font-semibold text-lighter-gray transition-all peer-focus:-translate-y-[18%] peer-focus:text-black peer-aria-[invalid]:text-red-500 dark:peer-focus:text-white ${
                    watch('email') ? '-translate-y-[18%]' : ''
                  }`}>
                  Email Address
                </label>
              </div>
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  aria-invalid={errors.password && 'true'}
                  className={`peer w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:pt-7 focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 aria-[invalid]:text-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10 dark:aria-[invalid]:text-red-500 ${
                    watch('password') ? 'pt-7' : ''
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <label
                  htmlFor="password"
                  className={`pointer-events-none absolute top-0 bottom-0 left-3 flex items-center text-sm font-semibold text-lighter-gray transition-all peer-focus:-translate-y-[18%] peer-focus:text-black peer-aria-[invalid]:text-red-500 dark:peer-focus:text-white ${
                    watch('password') ? '-translate-y-[18%]' : ''
                  }`}>
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-0 top-0 bottom-0 my-2 mr-3 flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all hover:bg-black/20 peer-aria-[invalid]:text-red-500 dark:text-white dark:hover:bg-white/20"
                  onClick={togglePassword}>
                  <FontAwesomeIcon icon={showPassword ? 'eye-slash' : 'eye'} />
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
              <div className="mt-5 flex w-full gap-3 lg:w-[70%]">
                <button
                  type="submit"
                  className="relative flex-1 overflow-hidden rounded-md bg-black py-2 text-white transition-all hover:flex-[1.2] dark:bg-white dark:text-black">
                  <LoadingButtonPlaceholder loading={isSubmitting} />
                  <span id="submitText" className="transition-all">
                    Sign up
                  </span>
                </button>
                <Link
                  to="/login"
                  className="flex flex-1 items-center justify-center rounded-md border border-light-gray py-2 text-light-gray transition-all duration-500 hover:flex-[1.2] dark:border-lighter-gray dark:text-lighter-gray">
                  Login
                </Link>
              </div>
            </form>
          </div>
          <div className="md:mx-18 mx-6 mb-6">
            <p className="text-light-gray dark:text-lighter-gray">
              By signing up you agree to Book&#39;s
              <br />
              <button
                type="button"
                className="font-bold text-black dark:text-white">
                Terms and Conditions
              </button>
              {' & '}
              <button
                type="button"
                className="font-bold text-black dark:text-white">
                Privacy Policy
              </button>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
