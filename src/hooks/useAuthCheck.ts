import React from 'react';

import {useAppSelector} from '@/store';

interface Error {
  email?: string;
  password?: string;
  username?: string;
}

interface UserResponse {
  email: string;
  fullname: string;
  username: string;
}

interface Response {
  success: boolean;
  data?: UserResponse;
  error?: Error;
}

const useAuthCheck = () => {
  const registeredUser = useAppSelector(state => state.auth.registeredUser);

  const checkUser = React.useCallback(
    (email: string, password: string): Response => {
      const foundUser = registeredUser.find(user => user.email === email);
      const isCorrectPass = foundUser?.password === password;
      return {
        success: !!foundUser && isCorrectPass,
        data: foundUser && {
          email: foundUser.email,
          fullname: foundUser.fullname,
          username: foundUser.username,
        },
      };
    },
    []
  );

  const checkRegisteredUser = React.useCallback(
    (email: string, username: string): Response => {
      const foundEmail = registeredUser.find(user => user.email === email);
      const foundUsername = registeredUser.find(
        user => user.username === username
      );
      return {
        success: !foundEmail && !foundUsername,
        error: {
          email: foundEmail && 'Email already registered',
          username: foundUsername && 'Username already taken',
        },
      };
    },
    []
  );

  return {checkUser, checkRegisteredUser};
};

export default useAuthCheck;
