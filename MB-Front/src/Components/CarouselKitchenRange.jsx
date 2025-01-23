import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import kitchenServices from "../services/kitchenServices";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const RangeKitchen = ({ kitchen }) => {
  const [kitchenCard, setKitchenCard] = useState([]);
  const [kitchenRight, setKitchenRight] = useState([]);
  const [kitchenLeft, setKitchenLeft] = useState([]);
  const [hoveredKitchen, setHoveredKitchen] = useState(null);

  // Fonction pour récupérer les données des cuisines depuis le service
  const fetchKitchen = async () => {
    try {
      const response = await kitchenServices.fetchKitchen();
      // Mettre à jour les états avec les données récupérées
      setKitchenCard(response.data);
      const middleIndex = Math.floor(response.data.length / 2);
      setKitchenLeft(response.data.slice(0, middleIndex));
      setKitchenRight(response.data.slice(middleIndex));
      // Définir la cuisine survolée initialement
      setHoveredKitchen(
        response.data.find((kitchen) => kitchen.Id_kitch === 1)
      );
    } catch (e) {
      console.log(e);
    }
  };

  // Appeler la fonction fetchKitchen une seule fois après le montage de la composante
  useEffect(() => {
    fetchKitchen();
  }, []);

  return (
    <>
      <div className="kitchen-range">
        <div className="left">
          {/* Afficher les cuisines à gauche */}
          {kitchenLeft.map((kitchen, index) => (
            <div key={index}>
              <li
                className={`hovered-kitchen ${
                  hoveredKitchen === kitchen ? "selected" : ""
                }`}
                onMouseEnter={() => setHoveredKitchen(kitchen)}
              >
                {kitchen.Name_kitch}
              </li>
            </div>
          ))}
        </div>

        <div className="range-img">
          {/* Afficher l'image de la cuisine survolée */}
          {hoveredKitchen && (
            <div>
              <img
                className="hovered-img"
                src={hoveredKitchen.Image_kitch}
                alt={hoveredKitchen.Name_kitch}
              />
            </div>
          )}
        </div>

        <div className="right">
          {/* Afficher les cuisines à droite */}
          {kitchenRight.map((kitchen, index) => (
            <div key={index}>
              <li
                className={`hovered-kitchen ${
                  hoveredKitchen === kitchen ? "selected" : ""
                }`}
                onMouseEnter={() => setHoveredKitchen(kitchen)}
              >
                {kitchen.Name_kitch}
              </li>
            </div>
          ))}
        </div>
      </div>

      <div className="kitchen-range-card">
        {/* Afficher un carrousel (pour les petits écrans) de cartes de cuisine */}
        <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]}>
          {kitchenCard.map((kitchenCard, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to={`/kitchen/` + kitchenCard.Id_kitch} state={kitchen}>
                  <h2 className="kitch-name">{kitchenCard.Name_kitch}</h2>
                  <img
                    className="img-card-kitch"
                    src={kitchenCard.Image_kitch}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default RangeKitchen;
