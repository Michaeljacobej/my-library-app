import React from 'react';

import {getRandomSeededColor} from '@/util/helper';

interface Props {
  value: string;
}

const Chip: React.FC<Props> = ({value}) => {
  const randColor = React.useMemo(() => getRandomSeededColor(value), []);

  return (
    <li
      className="rounded-full px-3 py-1 text-sm text-white"
      style={{backgroundColor: randColor}}>
      {value}
    </li>
  );
};

export default Chip;
