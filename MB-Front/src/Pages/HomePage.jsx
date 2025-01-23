import React from "react";
import Slider from "../components/SwiperHomePage";
import CarouselKitchenRange from "../components/CarouselKitchenRange";
import { Link } from "react-router-dom";
import Chrono from "../assets/chrono.svg";
import Prix from "../assets/prix.svg";
import Handshake from "../assets/handshake.svg";
import Crayon from "../assets/crayon.svg";
import Calendar from "../assets/calendar_month.svg";
import Door from "../assets/Lien Portes.svg";
import Accessories from "../assets/Lien Accessoires.svg";
import Worktop from "../assets/plan travail lien.svg";
import Trust from "../components/Carousseltrust";

const HomePage = () => {
  return (
    <>
      <div className="slider">
        <Slider />
      </div>
      <div className="line"> </div>
      <div className="containicon">
        <div className="divicon">
          <img src={Handshake} alt="handshake" className="icon" />
          <p className="texticon">Proximité</p>
        </div>
        <div className="divicon">
          <img src={Prix} alt="prix" className="icon" />
          <p className="texticon">Prix attractif</p>
        </div>
        <div className="divicon">
          <img src={Chrono} alt="chrono" className="icon" />
          <p className="texticon">Rapide</p>
        </div>
        <div className="divicon">
          <img src={Crayon} alt="crayon" className="icon" />
          <p className="texticon">Personnalisé</p>
        </div>
      </div>
      <div className="prise">
        <Link to={"/contact"} className="btn">
          <img src={Calendar} alt="Calendrier" className="calendar" />
          Prendre rendez-vous
        </Link>
      </div>

      <div className="line"></div>
      <h1>Nos Cuisines</h1>
      <p>Explorez nos cuisines !</p>
      <div>
        <CarouselKitchenRange />
      </div>

      <div className="line"></div>

      <div className="contain-link">
        <Link className="link-hp" to={"/portes"}>
          <img src={Door} alt="Door" className="img-link" />
          <h1 className="name-link">Portes</h1>
        </Link>
        <Link className="link-hp" to={"/accessoires"}>
          <img src={Accessories} alt="Accessories" className="img-link" />
          <h1 className="name-link">Accessoires</h1>
        </Link>
        <Link className="link-hp" to={"/plandetravail"}>
          <img src={Worktop} alt="Worktop" className="img-link" />
          <h1 className="name-link">Plan de travail</h1>
        </Link>
      </div>
      <div className="line"></div>

      <div className="trust">
        <div className="trusttitle">
          <h1>Ils nous ont fait confiance</h1>
          <img src={Handshake} alt="handshake" className="icon" />
        </div>
        <div className="swipetrust">
          <Trust />
        </div>
      </div>
    </>
  );
};

export default HomePage;
