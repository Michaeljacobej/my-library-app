import React from 'react';

import {useAppDispatch, useAppSelector} from '@/store';
import {toggleTheme} from '@/store/reducers/theme';

const ButtonThemeToggler: React.FC = () => {
  const theme = useAppSelector(state => state.theme.theme);
  const dispatch = useAppDispatch();

  const onToggle = React.useCallback(() => {
    dispatch(toggleTheme());
  }, []);

  return (
    <button
      type="button"
      className="cursor-pointer rounded-lg border-0 bg-inherit p-2"
      onClick={onToggle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 transition-[stroke] duration-[400ms] md:h-8 md:w-8 lg:h-10 lg:w-10"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <path
          pathLength="1"
          className={`moon-icon-${theme}`}
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        />
        <circle
          pathLength="1"
          className={`sun-icon-${theme}`}
          cx="12"
          cy="12"
          r="5"
        />
        <line
          pathLength="1"
          className={`sun-icon-${theme}`}
          x1="12"
          y1="1"
          x2="12"
          y2="3"
        />
        <line
          pathLength="1"
          className={`sun-icon-${theme}`}
          x1="12"
          y1="21"
          x2="12"
          y2="23"
        />
        <line
          pathLength="1"
          className={`sun-icon-${theme}`}
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
        />
        <line
          pathLength="1"
          className={`sun-icon-${theme}`}
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
        />
        <line
          pathLength="1"
          className={`sun-icon-${theme}`}
          x1="1"
          y1="12"
          x2="3"
          y2="12"
        />
        <line
          pathLength="1"
          className={`sun-icon-${theme}`}
          x1="21"
          y1="12"
          x2="23"
          y2="12"
        />
        <line
          pathLength="1"
          className={`sun-icon-${theme}`}
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
        />
        <line
          pathLength="1"
          className={`sun-icon-${theme}`}
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
        />
      </svg>
    </button>
  );
};

export default ButtonThemeToggler;
