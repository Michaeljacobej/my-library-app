import React from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppSelector} from '@/store';

const useIsLogin = (protect: boolean = false): boolean => {
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth && protect) {
      navigate('/home', {replace: true});
    } else {
      navigate('/login', {replace: true});
    }
  }, []);

  return isAuth;
};

export default useIsLogin;
