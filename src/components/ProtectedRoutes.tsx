import React from 'react';
import {Navigate} from 'react-router-dom';

import {useAppSelector} from '@/store';

interface Props {
  children: JSX.Element;
}

const ProtectedRoutes: React.FC<Props> = ({children}) => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoutes;
