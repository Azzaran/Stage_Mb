import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import kitchenServices from "../services/kitchenServices";
import "../styles/admin.css";
import Modifier from "../assets/crayon-modifier.svg";
import Supprimer from "../assets/supprimer.svg";
import { useNavigate } from "react-router-dom";

const AdminKitchen = () => {
  const [kitchen, setKitchen] = useState([]);
  const [kitch, setKitch] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const navigate = useNavigate();

  const fetchKitchen = async () => {
    try {
      const response = await kitchenServices.fetchKitchen();
      setKitchen(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setKitch({ ...kitch, [name]: value });
  };

  function extractFilename(value) {
    if (value.substr(0, 12) === "C:\\fakepath\\") return value.substr(12); 
    var x;
    x = value.lastIndexOf("/");
    if (x >= 0)
      return value.substr(x + 1);
    x = value.lastIndexOf("\\");
    if (x >= 0)
      return value.substr(x + 1);
    return value; 
  }

  const handleImgPath = (event) => {
    const { name, value } = event.currentTarget;
    const filename = extractFilename(value);
    setKitch({ ...kitch, [name]: "\\" + filename });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await kitchenServices.addKitchen(kitch);
      handleImageUpload();
      handlePdfUpload();
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

  // Fin d'envoit pdf


  const handleDelete = async (ID) => {
    try {
      await kitchenServices.deleteKitchenById(ID);
      window.location.reload();
    } catch (e) {
      console.log("Erreur lors de la suppression de la cuisine : ", e);
    }
  };

  useEffect(() => {
    fetchKitchen();
  }, []);

  return (
    <>
      <h1>Page admin cuisines</h1>

      <div className="add-form">
        <h2>Ajouter une cuisine</h2>
        <form
          action="/uploadkitch"
          method="POST"
          encType=" multipart/form-data"
          className="add-items"
          onSubmit={handleAdd}
        >
          <input
            type="text"
            name="Name_kitch"
            value={kitchen.Name_kitch}
            placeholder="Nom de l'image"
            onChange={handleChange}
          />
          <input
            type="file"
            name="Image_kitch"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              handleImgPath(event);
              handleImageChange(event);
            }}
          />
          <input
            type="text"
            name="Matiere"
            value={kitchen.Matiere}
            placeholder="Matière"
            onChange={handleChange}
          />
          <input
            type="text"
            name="Epaisseur"
            value={kitchen.Epaisseur}
            placeholder="Epaisseur"
            onChange={handleChange}
          />
          <input
            type="text"
            name="Finition"
            value={kitchen.Finition}
            placeholder="Finition"
            onChange={handleChange}
          />
          <input
            type="text"
            name="Aspect"
            value={kitchen.Aspect}
            placeholder="Aspect"
            onChange={handleChange}
          />
          <input
            type="file"
            name="Pdf_kitch"
            accept=".pdf"
            onChange={(event) => {
              handleImgPath(event);
              handlePdfChange(event);
            }}
          />
          <button type="submit" value="envoyer" className="btn">
            Envoyer
          </button>
        </form>
      </div>

      {/*  Fin de add img */}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom:</th>
            <th>Image:</th>
            <th>Matière:</th>
            <th>Épaisseur:</th>
            <th>Finition:</th>
            <th>Aspect:</th>
            <th>PDF:</th>
          </tr>
        </thead>
        <tbody>
          {kitchen.map((kit, index) => (
            <tr key={kit.Id_kitch || index}>
              <td className="kitbox">{kit.Name_kitch}</td>
              <td className="kitbox">
                <img src={kit.Image_kitch} alt={kit.Name_kitch} />
              </td>
              <td className="kitbox">{kit.Matiere}</td>
              <td className="kitbox">{kit.Epaisseur}</td>
              <td className="kitbox">{kit.Finition}</td>
              <td className="kitbox">{kit.Aspect}</td>
              <td className="kitbox">
                <a href={kit.Pdf_kitch} target="blank">{kit.Pdf_kitch}</a>
              </td>
              <td className="kitbox">
                <img
                  src={Modifier}
                  alt="crayon_modifier"
                  className="ad-img"
                  onClick={() => {
                    navigate("/AdminKitchen/" + kit.Id_kitch);
                  }}
                />
                <img
                  src={Supprimer}
                  alt="corbeille_supprimer"
                  className="ad-img"
                  onClick={() => {
                    handleDelete(kit.Id_kitch);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminKitchen;
