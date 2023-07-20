import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

import imgProfile from '@/assets/profile.png';
import {useAppDispatch, useAppSelector} from '@/store';
import {doLogout} from '@/store/reducers/auth';

interface Props {
  overlay: boolean;
  onCloseOverlay: () => void;
  onAddBook: () => void;
}

const HomeSideNav: React.FC<Props> = ({overlay, onCloseOverlay, onAddBook}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const onLogout = React.useCallback(() => {
    dispatch(doLogout());
  }, []);

  return (
    <div
      className={
        overlay
          ? 'fixed inset-0 z-[1000] flex w-full translate-x-0 flex-col items-center bg-white transition-all duration-700 dark:bg-little-dark-surface'
          : 'fixed inset-0 z-[1000] flex -translate-x-[100%] flex-col items-center bg-white shadow-lg transition-all duration-700 dark:bg-little-dark-surface md:flex md:w-[10vw] md:translate-x-0 lg:w-[25vw]'
      }>
      <button
        type="button"
        className={`self-end p-6 text-2xl text-red-500 transition-all duration-100 ${
          overlay ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onCloseOverlay}>
        <FontAwesomeIcon icon="times" className="mr-2" />
      </button>
      <img
        src={imgProfile}
        alt="Profile"
        className={`mx-3 max-w-[150px] pt-10 pb-4 ${
          overlay ? '' : 'md:max-w-[40px] lg:max-w-[150px]'
        }`}
      />
      <h2
        className={`inline text-center text-2xl font-bold dark:text-white ${
          overlay ? '' : 'md:hidden lg:inline'
        }`}>
        {user?.fullname}
      </h2>
      <button
        type="button"
        className={`my-2 flex items-center rounded-lg border border-lighter-gray px-4 py-1 dark:text-white ${
          overlay ? '' : 'md:hidden lg:flex'
        }`}
        onClick={onLogout}>
        <FontAwesomeIcon icon="sign-out" className="mr-2" />
        <span className="ml-2 font-bold">Logout</span>
      </button>
      <ul
        className={`my-12 flex w-full flex-1 flex-col items-center gap-12 px-0 text-xl font-bold dark:text-white ${
          overlay ? '' : 'lg:items-start lg:px-8'
        }`}>
        <li>
          <button type="button">
            <FontAwesomeIcon icon="search" className="mr-2" />
            <span className={overlay ? 'inline' : 'md:hidden lg:inline'}>
              Explore
            </span>
          </button>
        </li>
        <li>
          <button type="button">
            <FontAwesomeIcon icon="history" className="mr-2" />
            <span className={overlay ? 'inline' : 'md:hidden lg:inline'}>
              History
            </span>
          </button>
        </li>
        <li>
          <button type="button" onClick={onAddBook}>
            <FontAwesomeIcon icon="plus" className="mr-2" />
            <span className={overlay ? 'inline' : 'md:hidden lg:inline'}>
              Add Book
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HomeSideNav;
