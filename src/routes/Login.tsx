import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Helmet} from 'react-helmet';
import {SubmitHandler, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom';

import AuthLogo from '@/components/AuthLogo';
import AuthSectionLeft from '@/components/AuthSectionLeft';
import ButtonThemeToggler from '@/components/ButtonThemeToggler';
import LoadingButtonPlaceholder from '@/components/LoadingButtonPlaceholder';
import useAuthCheck from '@/hooks/useAuthCheck';
import {useAppDispatch} from '@/store';
import {doLogin} from '@/store/reducers/auth';

type LoginInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {checkUser} = useAuthCheck();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<LoginInputs>();

  const togglePassword = React.useCallback(() => {
    setShowPassword(state => !state);
  }, []);

  const onSubmit: SubmitHandler<LoginInputs> = React.useCallback(async data => {
    await new Promise<void>(resolve => {
      setTimeout(async () => resolve(), 2000);
    });
    const foundUser = checkUser(data.email, data.password);
    if (foundUser.success && foundUser.data) {
      dispatch(doLogin(foundUser.data));
      navigate('/home');
      toast.success('Login success', {
        position: 'top-right',
        className: 'bg-green-200 dark:bg-green-700 text-black dark:text-white',
      });
      return;
    }
    setLoginError(true);
    setError('email', {});
    setError('password', {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Login to Library App</title>
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
              Login
            </h1>
            <h2 className="text-sm font-semibold text-light-gray dark:text-lighter-gray md:text-base">
              Welcome Back, Please Login
              <br />
              to your Account
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 flex flex-col gap-3">
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
                    min: 8,
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
              <div className="mx-2 mt-4 mb-4 flex flex-row items-center justify-between">
                <div className="group flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="scale-150 accent-black group-hover:cursor-pointer dark:accent-white"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-4 font-semibold text-lighter-gray transition-all group-hover:cursor-pointer group-hover:text-black dark:group-hover:text-white">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="link self-end font-semibold text-light-gray hover:text-black dark:text-lighter-gray dark:hover:text-white">
                  Forgot Password
                </button>
              </div>
              {loginError && (
                <span className="text-xs text-red-500">
                  Login Failed: Your email or password is incorrect
                </span>
              )}
              <div className="flex w-full gap-3 lg:w-[70%]">
                <button
                  type="submit"
                  className="relative flex-1 overflow-hidden rounded-md bg-black py-2 text-white transition-all hover:flex-[1.2] dark:bg-white dark:text-black">
                  <LoadingButtonPlaceholder loading={isSubmitting} />
                  <span id="submitText" className="transition-all">
                    Login
                  </span>
                </button>
                <Link
                  to="/register"
                  className="hover: flex flex-1 items-center justify-center rounded-md border border-light-gray py-2 text-light-gray transition-all duration-500 hover:flex-[1.2] dark:border-lighter-gray dark:text-lighter-gray">
                  Sign up
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
                className="link font-bold text-black dark:text-white">
                Terms and Conditions
              </button>
              {' & '}
              <button
                type="button"
                className="link font-bold text-black dark:text-white">
                Privacy Policy
              </button>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
