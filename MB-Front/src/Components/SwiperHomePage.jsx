import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "../styles/homePage.css";
// import required modules
import { EffectFade, Autoplay } from "swiper/modules";
import kitchenServices from "../services/kitchenServices";

const Slider = () => {
  const [kitchen, setKitchen] = useState([]);

  const fetchFiveImgKitch = async () => {
    try {
      const response = await kitchenServices.fetchFiveImgKitch();
      setKitchen(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFiveImgKitch();
  }, [kitchen]);

  return (
    <div>
      <Swiper
        slidesPerView={5}
        loop={false}
        speed={1000}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        modules={[EffectFade, Autoplay]}
        className="mySwiper"
      >
      
        {kitchen.map((kitchenItem, index) => (
          <SwiperSlide key={kitchenItem.Id_kitch || index}>
            <img src={kitchenItem.Image_kitch} alt={kitchenItem.Name_kitch} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
