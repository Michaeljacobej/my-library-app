import React from 'react';

import Chip from '@/components/Chip';
import {Category} from '@/store/reducers/book';

interface Props {
  categories: Category[];
}

const BookCategory: React.FC<Props> = ({categories}) => {
  return (
    <ul className="flex flex-wrap gap-2 pt-12 pb-4 md:pt-2 lg:pr-12">
      {categories.map(cat => (
        <Chip key={cat.id} value={cat.name} />
      ))}
    </ul>
  );
};

export default BookCategory;
