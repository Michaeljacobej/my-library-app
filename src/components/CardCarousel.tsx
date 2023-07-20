import React from 'react';
import {useSwiper, useSwiperSlide} from 'swiper/react';

import {getImageFromURL} from '@/util/helper';

interface Props {
  title: string;
  author: string;
  imgUrl: string;
  onClick: () => void;
}

const CardCarousel: React.FC<Props> = ({title, author, imgUrl, onClick}) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  const slideTo = React.useCallback(() => {
    if (swiperSlide.isNext) {
      swiper.slideNext();
      return;
    }
    swiper.slidePrev();
  }, [swiperSlide]);

  return (
    <button
      type="button"
      className="flex h-60 flex-1 select-none flex-col justify-end overflow-hidden rounded-lg bg-cover bg-center transition-all md:h-64 lg:h-80"
      style={{
        backgroundImage: `url(${getImageFromURL(imgUrl)})`,
      }}
      onClick={swiperSlide.isActive ? onClick : slideTo}>
      <div className="w-full bg-black/30 px-6 py-4 text-start text-white">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm">{author}</p>
      </div>
    </button>
  );
};

export default CardCarousel;
