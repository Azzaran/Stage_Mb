import React, { useEffect, useState } from "react";
import Doors from "../assets/band_porte.svg";
import doorServices from "../services/doorServices.js";
import Calendar from "../assets/calendar_month.svg";
import { Link } from "react-router-dom";
import "../styles/door.css";
import hauteur from "../assets/Hauteur.svg";
import largeur from "../assets/Largeur.svg";

const Door = () => {
  const [door, setDoor] = useState([]);


  const fetchDoor = async () => {
    try {
      const response = await doorServices.fetchDoor();
      setDoor(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDoor();
  }, []);

  return (
    <>
      <div className="banner">
        <img src={Doors} className="bannerimage" />
        <div className="bannergreybox">
          <h1> Nos Portes</h1>
        </div>
      </div>
      <div className="door">
        {door.map((doorItem, index) => (
          <div className="doorCard" key={doorItem.Id_door || index}>
            <div>
              <div className="doorImg">
                <img
                  src={doorItem.Image_door}
                  alt={doorItem.Name_door}
                  className="imgDoor"
                />
              </div>
              <div className="doorInfo">
                <h1 className="title-door">{doorItem.Name_door}</h1>
                <p>{doorItem.Descr_door}</p>
                <div className="container-door">
                  {/* Hauteur */}
                  <div className="logo-door">
                    <div className="title-logo">
                      <img src={hauteur} alt="logo Hauteur" />
                      <h3>Hauteur</h3>
                    </div>
                    <p>{doorItem.Height_door} cm</p>
                  </div>
                  {/* Largeur */}
                    <div className="logo-door">
                    <div className="title-logo">
                      <img src={largeur} alt="logo Largeur" />
                      <h3>Largeur</h3>
                    </div>
                    <p>{doorItem.Width_door} cm</p>
                  </div>
                </div>
              <Link to={"/contact"} className="btn">
                <img src={Calendar} alt="Calendrier" className="calendar" />
                Prendre rendez-vous
              </Link>
              </div>
            </div>
            <div className="line-kitch"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Door;


