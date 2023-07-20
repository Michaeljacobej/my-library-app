import React from 'react';

import imgBookshelf from '@/assets/bookshelf.png';
import imgBookshelfDark from '@/assets/bookshelf-dark.png';
import {useAppSelector} from '@/store';
import {isDarkSelector} from '@/store/reducers/theme';

const DashboardLogo = () => {
  const isDark = useAppSelector(isDarkSelector);

  return (
    <img
      src={isDark ? imgBookshelfDark : imgBookshelf}
      alt="Bookshelf icon"
      className="w-8 lg:w-10"
    />
  );
};

export default DashboardLogo;
