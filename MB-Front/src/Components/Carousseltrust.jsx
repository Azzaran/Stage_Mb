import React, {useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import galleryServices from "../services/galleryServices";

function Trust() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleryTrust = async () => {
      try {
        const response = await galleryServices.fetchGalleryTrust();
        setGalleries(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchGalleryTrust();
  }, []);

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      centeredSlides={true}
      loop={false}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="trustswipe"
    >
      {galleries.map((gal, index) => (
        <SwiperSlide key={gal.Id_gallery || index} className="trustslide">
          <div className="carougreybox">
            <h1 className="trustname">{gal.Name_gallery}</h1>
          </div>
          <img
            className="imgtrust"
            src={gal.Image_gallery}
            alt={gal.Name_gallery}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Trust;
