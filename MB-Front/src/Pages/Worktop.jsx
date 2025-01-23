import React, { useState, useEffect } from "react";
import Worktops from "../assets/worktop_band.svg";
import worktopServices from "../services/worktopServices";
import "../styles/worktop.css";

const Worktop = () => {
  const [worktop, setWorktop] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null); // État pour stocker le type sélectionné

  const fetchWorktop = async () => {
    try {
      const response = await worktopServices.fetchWorktop();
      setWorktop(response.data);
      
      // Créer une liste de types uniques à partir des données
      const uniqueTypes = [...new Set(response.data.map(work => work.Type_wk))];
      setTypes(uniqueTypes);

      // Sélectionner le premier type par défaut
      if (uniqueTypes.length > 0) {
        setSelectedType(uniqueTypes[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchWorktop();
  }, []);

  return (
    <>
      <div className="banner">
        <img src={Worktops} className="bannerimage" alt="Banner" />
        <div className="bannergreybox">
          <h1> Nos Plans de Travail</h1>
        </div>
      </div>

      <div className="tabs">
        {types.map((type, index) => (
          <div
            className={`tab ${type === selectedType ? 'active' : ''}`}
            key={index}
            onClick={() => setSelectedType(type)}
          >
           {type}
          </div>
        ))}
      </div>

      <div className="worktop">
        {worktop
          .filter(work => work.Type_wk === selectedType)
          .map((work, index) => (
            <div className="worktop-card" key={work.Id_wk || index}>
              
              <img
                src={work.Image_wk}
               // alt="Images plan de travail"
                className="imgKitch"
              />
              <div>{work.Name_wk} </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Worktop;
