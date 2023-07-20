import useIsLogin from '@/hooks/useIsLogin';

const Root = (): null => {
  useIsLogin(true);
  return null;
};

export default Root;
