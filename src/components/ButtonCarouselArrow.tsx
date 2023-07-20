import React from 'react';

interface Props {
  arrow: 'prev' | 'next';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonCarouselArrow: React.FC<Props> = ({arrow, onClick}) => {
  return (
    <button
      className="pointer-events-auto flex h-full cursor-pointer items-center justify-center px-4"
      type="button"
      aria-label={`${arrow === 'prev' ? 'Previous' : 'Next'} slide`}
      onClick={onClick}>
      <span className="inline-flex aspect-square h-10 w-10 rotate-180 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-125 ">
        <svg
          aria-hidden="true"
          className={`h-6 w-6 text-black  ${
            arrow === 'prev' ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="sr-only">
          {arrow === 'prev' ? 'Previous' : 'Next'}
        </span>
      </span>
    </button>
  );
};

export default ButtonCarouselArrow;
