import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
  page: number;
  totalPage: number;
  onNext: () => void;
  onPrev: () => void;
  toPage: (page: number) => void;
}

const PaginationNav: React.FC<Props> = ({
  page,
  totalPage,
  onNext,
  onPrev,
  toPage,
}) => {
  return (
    <div className="flex items-center justify-center pt-6 dark:text-white">
      <button
        type="button"
        className="mx-2 flex aspect-square items-center justify-center rounded-full px-3 py-2 hover:bg-black/10 disabled:!bg-transparent disabled:text-white/20 dark:hover:bg-white/10"
        disabled={!page}
        onClick={page ? onPrev : undefined}>
        <FontAwesomeIcon icon={'fa-solid fa-angle-left' as IconProp} />
      </button>
      {[...Array(totalPage).keys()]
        .map(val => (
          <button
            type="button"
            disabled={page === val}
            className="mx-2 flex aspect-square w-10 items-center justify-center rounded-full px-4 py-2 hover:bg-black/10 disabled:!bg-white/20 disabled:text-white dark:hover:bg-white/10"
            onClick={() => toPage(val)}>
            {val + 1}
          </button>
        ))
        .slice(page <= 0 ? page : page - 1, page + 2)}
      <button
        type="button"
        className="mx-2 flex aspect-square items-center justify-center rounded-full px-3 py-2 hover:bg-black/10 disabled:!bg-transparent disabled:text-white/20 dark:hover:bg-white/10"
        disabled={page + 1 === totalPage}
        onClick={onNext}>
        <FontAwesomeIcon icon={'fa-solid fa-angle-right' as IconProp} />
      </button>
    </div>
  );
};

export default PaginationNav;
