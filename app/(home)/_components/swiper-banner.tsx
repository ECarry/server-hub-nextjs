'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const SwiperBanner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[500px] w-full rounded-3xl"
        style={{
          // @ts-ignore
          '--swiper-navigation-size': '22px',
          '--swiper-navigation-sides-offset': '22px',
          '--swiper-navigation-color': '#d1d5db',
          '--swiper-pagination-color': '#f43f5e',
          '--swiper-pagination-bullet-size': '12px',
          '--swiper-pagination-bullet-inactive-opacity': '0.1'
        }}
      >
        <SwiperSlide>
          <div className='w-full h-full bg-rose-300'>

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='w-full h-full bg-green-500'>

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='w-full h-full bg-yellow-500'>

          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default SwiperBanner
