import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import testimonial1 from "./../../assets/img/testimonial-1.jpg";
import testimonial2 from "./../../assets/img/testimonial-2.jpg";
import testimonial3 from "./../../assets/img/testimonial-3.jpg";
import testimonial4 from "./../../assets/img/testimonial-4.jpg";
import './testimonial.css';

const testimonials = [
  {
    image: testimonial1,
    name: "C-Marvel",
    review: "Amazing service! Highly recommended for anyone seeking quality food.",
  },
  {
    image: testimonial2,
    name: "Thor",
    review: "The food and service are fantastic. Will visit again soon!",
  },
  {
    image: testimonial3,
    name: "Doom",
    review: "A delightful experience. The team ensures everything is perfect!",
  },
  {
    image: testimonial4,
    name: "BlackW",
    review: "Five stars for the great service and delicious food!",
  },
];

const Testimonial = () => {
  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">
            Testimonial
          </h5>
          <h1 className="mb-5">Our Clients Say!!!</h1>
        </div>

        {/* Testimonial Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation
          loop={true} 
          autoplay={{
            delay: 2000, 
            disableOnInteraction: false, 
          }}
          modules={[Navigation, Pagination, Autoplay]} 
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="testimonial-slide">
              <div className="testimonial-card d-flex flex-column align-items-center text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-img rounded-circle shadow"
                />
                <p className="testimonial-review mt-4">
                  "{testimonial.review}"
                </p>
                <h5 className="testimonial-name text-primary mt-2">
                  {testimonial.name}
                </h5>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
