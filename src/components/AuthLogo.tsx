import React from 'react';

import imgBookshelf from '@/assets/bookshelf.png';
import imgBookshelfDark from '@/assets/bookshelf-dark.png';
import {useAppSelector} from '@/store';
import {isDarkSelector} from '@/store/reducers/theme';

const AuthLogo = () => {
  const isDark = useAppSelector(isDarkSelector);

  return (
    <img
      src={isDark ? imgBookshelfDark : imgBookshelf}
      alt="Bookshelf icon"
      className="w-12 md:w-16 lg:w-24"
    />
  );
};

export default AuthLogo;
