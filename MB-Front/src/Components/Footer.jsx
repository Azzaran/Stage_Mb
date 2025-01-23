import React, { useState, useEffect } from "react";
import Logo from "../assets/mbcuisines-removebg.png";
import Belgique from "../assets/belgique.svg";
import France from "../assets/france.svg";
import Facebook from "../assets/facebook.svg";
import Instagram from "../assets/instagram.svg";
import profileServices from "../services/profileServices";
import { Link } from "react-router-dom";

const Footer = () => {
  const [profil, setProfil] = useState([]);
  const [isFixed, setIsFixed] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await profileServices.fetchProfile();
      setProfil(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div
        className="footer"
      >
        <div className="logo">
          <img src={Logo} alt="Logo" id="logo" />
        </div>
        <div className="info">
          <p className="firstline">
            Tel <img src={Belgique} alt="Belgique" id="icons" /> :{" "}
            {profil.Phone_Belgian} - Tel{" "}
            <img src={France} alt="France" id="icons" /> : {profil.Phone_French}
            |
            <Link className="link" to={"/contact"}>
              {" "}
              Contactez-nous
            </Link>
          </p>
          <p className="secondline">
            <Link className="link">A propos</Link> |{" "}
            <Link className="link" to={"/mentionslegales"}>
              {" "}
              Mentions Légales
            </Link>{" "}
            |{" "}
            <Link className="link" to={"/politiquesConf"}>
              Politiques de confidentialités
            </Link>
          </p>
        </div>
        <div className="reseau">
        <a href="https://www.facebook.com/mbcuisines.templeuve">
          <img src={Facebook} alt="Facebook" />
        </a>
        <a href="">
          <img src={Instagram} alt="Instagam" />
        </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
