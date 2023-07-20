import React from 'react';

const AuthSectionLeft = () => {
  return (
    <section
      id="left"
      className="hidden flex-col justify-between bg-auth-img bg-cover transition-all md:flex md:flex-[2] lg:flex-[3]">
      <h1 className="py-20 px-14 text-4xl font-bold leading-[1.4] text-white lg:text-5xl">
        Book is a window
        <br />
        to the world
      </h1>
      <p className="px-8 font-semibold text-white">
        Photo by Mark Pan4ratte on Unsplash
      </p>
    </section>
  );
};

export default AuthSectionLeft;
