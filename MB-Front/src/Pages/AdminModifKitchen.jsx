import React, { useEffect, useState } from "react";
import kitchenServices from "../services/kitchenServices";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";

const ModifKitch = () => {
  const { id } = useParams();
  const [kitchModif, setKitchModif] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [activImg, setActivImg] = useState(false);
  const [activPdf, setActivPdf] = useState(false);
  const navigate = useNavigate();

  const fetchKitchByID = async () => {
    try {
      const response = await kitchenServices.fetchKitchByID(id);
      setKitchModif(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(kitchModif);

  // Modifie les infos de la cuisine selectionne

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setKitchModif({ ...kitchModif, [name]: value });
  };

  const handleModif = async (e) => {
    e.preventDefault();
    try {
      const response = await kitchenServices.modifKitchen(kitchModif);
      handleImageUpload();
      handlePdfUpload();
      navigate("/AdminKitchen");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_kitch", selectedImage);
      console.log(formData);
      try {
        await axios.post("http://127.0.0.1:3000/uploadkitchimg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  // Fin de add img
  //Début envoit pdf

  const handlePdfUpload = async () => {
    if (selectedPdf) {
      const formData = new FormData();
      formData.append("Pdf_kitch", selectedPdf);
      console.log(formData);
      try {
        await axios.post("http://127.0.0.1:3000/uploadkitchpdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Pdf uploaded successfully!");
      } catch (error) {
        console.error("Error uploading pdf:", error);
      }
    }
  };

  const handlePdfChange = (event) => {
    setSelectedPdf(event.target.files[0]);
  };

  function extractFilename(value) {
    if (value.substr(0, 12) === "C:\\fakepath\\") return value.substr(12); // modern browser
    var x;
    x = value.lastIndexOf("/");
    if (x >= 0)
      // Unix-based path
      return value.substr(x + 1);
    x = value.lastIndexOf("\\");
    if (x >= 0)
      // Windows-based path
      return value.substr(x + 1);
    return value; // just the filename
  }

  const handleImgPath = (event) => {
    const { name, value } = event.currentTarget;
    const filename = extractFilename(value);
    setKitchModif({ ...kitchModif, [name]: "\\" + filename });
  };

  useEffect(() => {
    fetchKitchByID();
  }, []);

  return (
    <>
      <h1 className="titlemodif">Modifier une cuisine</h1>
      <div className="modif-form">
        <form
          action="/uploadkitch"
          method="POST"
          encType=" multipart/form-data"
          className="modif-items"
          onSubmit={handleModif}
        >
          <input
            type="hidden"
            value={kitchModif.Id_kitch || ""}
            name="Id_kitch"
          />
          <input
            type="text"
            onChange={handleChange}
            value={kitchModif.Name_kitch}
            name="Name_kitch"
          />

          <input
            type="text"
            name="Matiere"
            value={kitchModif.Matiere}
            onChange={handleChange}
          />

          <input
            type="text"
            name="Epaisseur"
            value={kitchModif.Epaisseur}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Finition"
            value={kitchModif.Finition}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Aspect"
            value={kitchModif.Aspect}
            onChange={handleChange}
          />

          
          {activImg === false ? (
          <div className="upload">
            <input
              type="hidden"
              name="Image_kitch"
              value={kitchModif.Image_kitch}
            />
            <img src={kitchModif.Image_kitch} alt={kitchModif.Name_kitch}  className="imgmodif"/>
            <button className="btn-modif" onClick={() => setActivImg(true)}>
              Modifier Image
            </button>
          </div>
        ) : (
          <input
            type="file"
            name="Image_kitch"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              handleImgPath(event);
              handleImageChange(event);
            }}
          />
        )}
        {activPdf === false ? (
          <div className="upload">
            <input
              type="hidden"
              name="Pdf_kitch"
              value={kitchModif.Pdf_kitch}
            />
            <a href={kitchModif.Pdf_kitch} target="blank"  className="imgmodif">
            {kitchModif.Pdf_kitch}
            </a>
            <button className="btn-modif" onClick={() => setActivPdf(true)}>
              Modifier PDF
            </button>
          </div>
        ) : (
          <input
            type="file"
            name="Pdf_kitch"
            accept=".pdf"
            onChange={(event) => {
              handleImgPath(event);
              handlePdfChange(event);
            }}
          />
        )}
          <button type="submit" value="Ajouter" className="btn">
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </>
  );
};

export default ModifKitch;
