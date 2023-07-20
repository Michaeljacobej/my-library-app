import React from 'react';

import LoadingCircle from '@/components/LoadingCircle';

interface Props {
  loading: boolean;
}

const LoadingButtonPlaceholder: React.FC<Props> = ({loading}) => {
  return (
    <div
      id="loading"
      className={`absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-white/80 transition-all ${
        loading ? 'opacity-100' : 'opacity-0'
      }`}>
      <LoadingCircle />
    </div>
  );
};

export default LoadingButtonPlaceholder;
