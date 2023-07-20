import 'swiper/css';

import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import ButtonCarouselNav from '@/components/ButtonCarouselNav';
import CardCarousel from '@/components/CardCarousel';
import {useAppSelector} from '@/store';
import {carouselSelector} from '@/store/reducers/book';

interface Props {
  onBookClick: (id: number) => void;
}

const HomeCarousel: React.FC<Props> = ({onBookClick}) => {
  const carouselData = useAppSelector(carouselSelector);

  return (
    <div className="pt-2">
      <Swiper
        centeredSlides
        spaceBetween={50}
        autoplay
        slidesPerView={1}
        initialSlide={1}
        loop
        grabCursor
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
        className="flex items-center pt-6 pb-4">
        {carouselData.map(carousel => (
          <SwiperSlide
            key={carousel.id}
            className="flex items-center overflow-hidden rounded-lg shadow-md transition-all [&.swiper-slide]:!scale-75 [&.swiper-slide-active]:!scale-100">
            <CardCarousel
              {...carousel}
              onClick={() => onBookClick(carousel.id)}
            />
          </SwiperSlide>
        ))}
        <ButtonCarouselNav />
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
