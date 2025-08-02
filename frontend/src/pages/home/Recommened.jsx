import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
import SliderBookCard from "./SliderBookCard";
import { useFetchRecommendedBooksQuery } from "../../redux/features/books/booksApi";
import Loading from "../../components/Loading";

const Recommened = () => {
  const {
    data: recommendedBooks,
    isLoading,
    isError,
  } = useFetchRecommendedBooksQuery(10);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="py-16">
        <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>
        <p className="text-red-500">Failed to load recommendations</p>
      </div>
    );
  }

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

      <div className="book-slider-container">
        {recommendedBooks && recommendedBooks.length > 0 ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {recommendedBooks.map((book, index) => (
              <SwiperSlide key={index} className="h-auto">
                <SliderBookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No recommendations available at the moment</p>
        )}
      </div>
    </div>
  );
};

export default Recommened;
