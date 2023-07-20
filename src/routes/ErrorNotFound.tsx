import React from 'react';

const ErrorNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h3 className="uppercase">Oops! Page not found</h3>
        <h1 className="text-9xl font-bold -tracking-[24px]">
          <span className="text-shadow">4</span>
          <span className="text-shadow">0</span>
          <span className="text-shadow">4</span>
        </h1>
      </div>
      <h2 className="uppercase">
        we are sorry, but the page you requested was not found
      </h2>
    </div>
  );
};

export default ErrorNotFound;
