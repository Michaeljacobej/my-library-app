import React from 'react';
import {useSwiper} from 'swiper/react';

import ButtonCarouselArrow from '@/components/ButtonCarouselArrow';

const ButtonCarouselNav: React.FC = () => {
  const swiper = useSwiper();

  return (
    <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-10 flex justify-between">
      <ButtonCarouselArrow arrow="prev" onClick={() => swiper.slidePrev()} />
      <ButtonCarouselArrow arrow="next" onClick={() => swiper.slideNext()} />
    </div>
  );
};

export default ButtonCarouselNav;
