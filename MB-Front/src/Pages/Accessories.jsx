import React, { useEffect, useState } from "react";
import handleService from "../services/handleServices";
import accessoriesService from "../services/accessoriesServices";
import Handle from "../assets/handle_band.svg";
import Acc from "../assets/acc_band.svg";
import "../styles/accessories.css";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [handle, setHandle] = useState([]);


  const handleScroll = () => {
    const currentUrl = window.location.href;
    if (currentUrl === "http://localhost:3001/accessoires#acc") {
      const section2 = document.getElementById('section2');
      if (section2) {
        section2.scrollIntoView({ behavior: "smooth" });
      }
    } 
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessoriesResponse = await accessoriesService.fetchAccessories();
        const handleResponse = await handleService.fetchHandle();
        setAccessories(accessoriesResponse.data);
        setHandle(handleResponse.data);
        handleScroll();
      } catch (error) {
        console.error("Une erreur s'est produite lors du chargement des données :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="banner">
        <img src={Handle} className="bannerimage" id="section1"/>
        <div className="bannergreybox">
          <h1> Nos Poignées</h1>
        </div>
      </div>
      <div className="container">
        {handle.map((han, index) => (
          <div key={han.Id_hand || index} className="contain">
            <img src={han.Image_hand} alt="poignée" />
            <p>{han.Name_hand}</p>
          </div>
        ))}
      </div>
      <div className="banner" id="section2" >
        <img src={Acc} className="bannerimage" />
        <div className="bannergreybox">
          <h1> Nos Accessoires</h1>
        </div>
      </div>
      <div className="container">
        {accessories.map((acc, index) => (
          <div key={acc.Id_acc || index} className="contain">
            <img src={acc.Image_acc} alt="accessoire" />
            <p>{acc.Name_acc}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accessories;
