import {useAutoAnimate} from '@formkit/auto-animate/react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {RefObject} from 'react';
import Select from 'react-select';

import CardBook from '@/components/CardBook';
import PaginationNav from '@/components/PaginationNav';
import useWindowDimensions from '@/hooks/useWindowDimension';
import {useAppSelector} from '@/store';
import {booksSelector, Category} from '@/store/reducers/book';
import {getRandomSeededColor} from '@/util/helper';

interface Props {
  onBookClick: (id: number) => void;
}

type Sort = {
  value: string;
  label: string;
};

const sortOptions: Sort[] = [
  {
    value: 'name',
    label: 'Nama',
  },
  {
    value: 'date',
    label: 'Tanggal',
  },
];

type SortDirection = 'asc' | 'desc';

const HomeBookList: React.FC<Props> = ({onBookClick}) => {
  const bookData = useAppSelector(booksSelector);
  const categories = useAppSelector(state => state.book.categories);
  const [parent] = useAutoAnimate();
  const [filterState, setFilterState] = React.useState<Category[]>([]);
  const [sortState, setSortState] = React.useState<Sort | null>(null);
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>('asc');
  const windowDimension = useWindowDimensions();
  const [pageState, setPageState] = React.useState<number>(0);

  const itemsPerPage = React.useMemo(() => {
    if (windowDimension.width < 768) {
      return 9;
    }
    if (windowDimension.width < 1024) {
      return 12;
    }
    return 15;
  }, [windowDimension]);

  const onSortDirection = React.useCallback(() => {
    setSortDirection(val => (val === 'asc' ? 'desc' : 'asc'));
  }, []);

  const sortedBookData = React.useMemo(() => {
    if (sortState) {
      switch (sortState.value) {
        case 'name':
          return bookData.slice().sort((a, b) => {
            if (sortDirection === 'asc') {
              return a.title > b.title ? 1 : -1;
            }
            return a.title < b.title ? 1 : -1;
          });
        case 'date':
          return bookData.slice().sort((a, b) => {
            if (sortDirection === 'asc') {
              return a.datePublished.date > b.datePublished.date ? 1 : -1;
            }
            return a.datePublished.date < b.datePublished.date ? 1 : -1;
          });
        default:
          break;
      }
    }
    return sortDirection === 'asc' ? bookData : bookData.slice().reverse();
  }, [bookData, sortState, sortDirection]);

  const filteredBookData = React.useMemo(() => {
    if (filterState.length) {
      return sortedBookData
        .map(val => {
          if (val.category.find(cat => filterState.includes(cat))) {
            return val;
          }
          return null;
        })
        .filter((val): val is typeof bookData[number] => val !== null);
    }
    return sortedBookData;
  }, [filterState, sortedBookData]);

  const paginatedBookData = React.useMemo(
    () =>
      filteredBookData.slice(
        pageState * itemsPerPage,
        (pageState + 1) * itemsPerPage
      ),
    [filteredBookData, pageState, itemsPerPage]
  );

  const totalPage = React.useMemo(() => {
    return Math.ceil(filteredBookData.length / itemsPerPage);
  }, [filteredBookData, itemsPerPage]);

  React.useEffect(() => {
    if (pageState > totalPage) {
      setPageState(totalPage);
    }
  }, [pageState, totalPage]);

  return (
    <section className="w-full flex-grow px-4 py-4 transition-all">
      <h3 className="text-2xl font-bold dark:text-lighter-gray">List Book</h3>
      <div className="flex flex-col justify-end gap-4 pt-2 pb-4 md:flex-row">
        <div className="flex items-center rounded-lg border border-lighter-gray dark:border-white">
          <FontAwesomeIcon
            icon={'fa-solid fa-filter' as IconProp}
            className="ml-2 p-2 text-black dark:text-white"
          />
          <Select
            options={categories}
            isMulti
            getOptionValue={option => `${option.id}`}
            getOptionLabel={option => option.name}
            className="flex-1"
            classNames={{
              input: () => '!text-black dark:!text-white',
              multiValueLabel: () => '!text-black dark:!text-white',
              menu: () => 'dark:!bg-dark-surface',
              menuList: () => 'dark:text-white',
              option: data => (data.isFocused ? '!bg-white/10' : ''),
              indicatorSeparator: () => '!bg-transparent',
              control: () =>
                '!bg-transparent !border-transparent !shadow-none hover:!border-transparent',
            }}
            styles={{
              multiValue: (base, state) => ({
                ...base,
                backgroundColor: getRandomSeededColor(state.data.name),
              }),
            }}
            onChange={value => setFilterState(value as Category[])}
          />
        </div>
        <div className="flex items-center rounded-lg border border-lighter-gray dark:border-white">
          <FontAwesomeIcon
            icon={
              (sortDirection === 'asc'
                ? 'fa-solid fa-arrow-up-wide-short'
                : 'fa-solid fa-arrow-down-short-wide') as IconProp
            }
            className="ml-2 rounded-full p-2 text-black hover:bg-white/10 dark:text-white"
            onClick={onSortDirection}
          />
          <Select
            placeholder="Sort"
            options={sortOptions}
            isClearable
            className="flex-1"
            classNames={{
              input: () => '!text-black dark:!text-white',
              singleValue: () => '!text-black dark:!text-white',
              menu: () => 'dark:!bg-dark-surface',
              menuList: () => 'dark:text-white',
              indicatorSeparator: () => '!bg-transparent',
              option: data => (data.isFocused ? '!bg-white/10' : ''),
              control: () =>
                '!bg-transparent !border-transparent !shadow-none hover:!border-transparent',
            }}
            value={sortState}
            onChange={value => setSortState(value)}
          />
        </div>
      </div>
      {paginatedBookData.length ? (
        <div
          ref={parent as RefObject<HTMLDivElement>}
          className="mx-2 grid grid-cols-3 gap-4 transition-all md:mx-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {paginatedBookData.map(book => (
            <CardBook
              key={book.id}
              title={book.title}
              description={book.description}
              imgUrl={book.imgUrl}
              onClick={() => onBookClick(book.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 dark:text-white">
          <FontAwesomeIcon
            icon={'fa-solid fa-triangle-exclamation' as IconProp}
            className="text-4xl"
          />
          <h2 className="text-xl">Tidak ada buku</h2>
        </div>
      )}
      {filteredBookData.length ? (
        <PaginationNav
          page={pageState}
          totalPage={totalPage}
          onNext={() => setPageState(val => val + 1)}
          onPrev={() => setPageState(val => val - 1)}
          toPage={page => setPageState(page)}
        />
      ) : null}
    </section>
  );
};

export default HomeBookList;
