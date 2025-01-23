import React, { useEffect, useState } from "react";
import kitchenServices from "../services/kitchenServices";
import "../styles/kitchen.css";
import pdfIcon from "../assets/icon-pdf.svg";
import epaisseur from "../assets/Epaisseur.svg";
import finition from "../assets/Finition.svg";
import goutte from "../assets/goutte.svg";
import matiere from "../assets/matiere.svg";
import Cuisinesimg from "../assets/band_cuisines.svg";

const KitchenCard = () => {
  const [kitch, setKitch] = useState([]);

  const fetchKitchen = async () => {
    try {
      const response = await kitchenServices.fetchKitchen();
      setKitch(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchKitchen();
  }, []);

  return (
    <>
      <div className="banner">
        <img src={Cuisinesimg} className="bannerimage" />
        <div className="bannergreybox">
          <h1> Nos Cuisines</h1>
        </div>
      </div>
      <div className="kitch">
        {kitch.map((kitchenItem, index) => (
          <div className="kitchCard" key={kitchenItem.Id_kitch || index}>
            <div>
              <div className="kitchImg">
                <img
                  src={kitchenItem.Image_kitch}
                  alt={kitchenItem.Name_kitch}
                  className="imgKitch"
                />
              </div>
              <div className="kitchInfo">
                <h1 className="title-kitch">{kitchenItem.Name_kitch}</h1>
                <div className="container-kitch">
                  <div className="logo-kitch">
                    <div className="title-logo">
                      <img src={matiere} alt="logo Matière" />
                      <h3>Matière</h3>
                    </div>
                    <p>{kitchenItem.Matiere}</p>
                  </div>
                  <div className="logo-kitch">
                    <div className="title-logo">
                      <img src={epaisseur} alt="logo Epaisseur" />
                      <h3>Epaisseur</h3>
                    </div>
                    <p>{kitchenItem.Epaisseur}</p>
                  </div>
                  <div className="logo-kitch">
                    <div className="title-logo">
                      <img src={finition} alt="logo Finition" />
                      <h3>Finition</h3>
                    </div>
                    <p>{kitchenItem.Finition}</p>
                  </div>
                  <div className="logo-kitch">
                    <div className="title-logo">
                      <img src={goutte} alt="logo Aspect" />
                      <h3>Aspect</h3>
                    </div>
                    <p>{kitchenItem.Aspect}</p>
                  </div>
                </div>
                <a href={kitchenItem.Pdf_kitch} target="blank" className="btn">
                  Catalogue tarifaire <img src={pdfIcon} alt="pdf" />
                </a>
              </div>
            </div>
            <div className="line-kitch"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default KitchenCard;
