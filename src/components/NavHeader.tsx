import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';

import ButtonThemeToggler from '@/components/ButtonThemeToggler';
import DashboardLogo from '@/components/DashboardLogo';
import {useAppSelector} from '@/store';
import {booksSelector} from '@/store/reducers/book';

interface Props {
  onBurgerClick: () => void;
}

const NavHeader: React.FC<Props> = ({onBurgerClick}) => {
  const navigate = useNavigate();
  const books = useAppSelector(booksSelector);

  const onClickSearch = React.useCallback((id: number) => {
    navigate(`/book/${id}`);
  }, []);

  return (
    <header className="sticky top-0 z-10 w-full bg-white py-3 shadow-xl transition-all dark:bg-little-dark-surface">
      <nav className="flex flex-col px-5">
        <div className="flex justify-between lg:gap-x-20">
          <div className="flex items-center gap-4 font-bold dark:text-white">
            <button type="button" className="lg:hidden" onClick={onBurgerClick}>
              <FontAwesomeIcon icon="bars" />
            </button>
            <button type="button" className="text-xs lg:text-sm">
              All Categories
              <FontAwesomeIcon icon="caret-down" className="ml-2" />
            </button>
            <button type="button" className="text-xs lg:text-sm">
              All Time
              <FontAwesomeIcon icon="caret-down" className="ml-2" />
            </button>
          </div>
          <div className="hidden flex-1 items-center rounded-full border border-lighter-gray px-6 text-sm text-light-gray dark:text-white lg:flex">
            <FontAwesomeIcon icon="search" className="mr-2" />
            <Select
              placeholder="Cari nama / author buku"
              options={books}
              getOptionValue={option => `${option.id}`}
              getOptionLabel={option => `${option.title} - ${option.author}`}
              classNames={{
                input: () => '!text-black dark:!text-white',
                singleValue: () => '!text-black dark:!text-white',
                container: () => 'w-full',
                menu: () => '!bg-dark-surface',
                menuList: () => 'dark:text-white',
                indicatorSeparator: () => '!bg-transparent',
                dropdownIndicator: () => '!text-transparent',
                option: data => (data.isFocused ? '!bg-white/10' : ''),
                control: () =>
                  '!bg-transparent !border-transparent !shadow-none hover:!border-transparent w-full',
              }}
              onChange={data => (data ? onClickSearch(data.id) : null)}
            />
          </div>
          <div className="flex items-center">
            <DashboardLogo />
            <h2 className="hidden pl-2 text-base font-bold dark:text-white lg:inline lg:text-xl">
              Library
            </h2>
            <ButtonThemeToggler />
          </div>
        </div>
        <button
          type="button"
          className="mt-2 flex w-full items-center rounded-full border border-lighter-gray px-6 py-2 text-xs text-light-gray dark:text-white lg:hidden lg:text-base">
          <FontAwesomeIcon icon="search" className="mr-2" />
          <span className="pl-2">Search book</span>
        </button>
      </nav>
    </header>
  );
};

export default NavHeader;
