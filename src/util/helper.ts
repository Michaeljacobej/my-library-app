import randomSeed from 'random-seed';

import {colors} from '@/constants';
import {DatePickerState} from '@/store/reducers/book';

export const getImageFromURL = (imgUrl: string | undefined) =>
  imgUrl && imgUrl.startsWith('http') ? imgUrl : `/src/assets/${imgUrl}`;

export const getDatePropsFromType = (type: DatePickerState) => {
  if (type === 'year') {
    return {
      dateFormat: 'yyyy',
      showYearPicker: true,
    };
  }
  if (type === 'month') {
    return {
      dateFormat: 'MM/yyyy',
      showMonthYearPicker: true,
      showFullMonthYearPicker: true,
    };
  }
  return {dateFormat: 'dd/MM/yyyy'};
};

export const getMomentFormatFromType = (type: DatePickerState) => {
  if (type === 'year') {
    return 'YYYY';
  }
  if (type === 'month') {
    return 'MMMM YYYY';
  }
  return 'Do MMMM YYYY';
};

export const getRandomSeededColor = (seed: string | undefined) => {
  const index = randomSeed.create(seed).intBetween(0, colors.length - 1);
  return colors[index];
};

export const getLabelFromType = (type: DatePickerState) => {
  if (type === 'year') {
    return 'Tahun';
  }
  if (type === 'month') {
    return 'Bulan & Tahun';
  }
  return 'Tanggal, Bulan & Tahun';
};

export default {getImageFromURL, getDatePropsFromType};
