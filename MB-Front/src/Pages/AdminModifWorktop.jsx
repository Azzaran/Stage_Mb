import React, { useEffect, useState } from "react";
import worktopServices from "../services/worktopServices";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";

const ModifWorktop= () => {
  const { id } = useParams();
  const [wkModif, setWkModif] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [activImg, setActivImg] = useState(false);
  const navigate = useNavigate();

  const fetchWorktopByID = async () => {
    try {
      const response = await worktopServices.fetchWorktopByID(id);
      setWkModif(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(wkModif);

  // Modifie les infos de la cuisine selectionne

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setWkModif({ ...wkModif, [name]: value });
  };

  const handleModif = async (e) => {
    e.preventDefault();
    try {
      const response = await worktopServices.modifWorktop(wkModif);
      handleImageUpload();
      navigate("/AdminWorktop");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_wk", selectedImage);
      console.log(formData);
      try {
        await axios.post("http://127.0.0.1:3000/uploadworktop", formData, {
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
    setWkModif({ ...wkModif, [name]: "\\" + filename });
  };

  useEffect(() => {
    fetchWorktopByID();
  }, []);

  return (
    <>
      <h1 className="titlemodif">Modifier le plan de travail</h1>
        <div className="modif-form">
        <form
          action="/uploadworktop"
          method="POST"
          encType=" multipart/form-data"
          className="modif-items"
          onSubmit={handleModif}
        >
          <div>
          <input type="hidden" value={wkModif.Id_wk || ""} name="Id_wk" />
          <input
            type="text"
            onChange={handleChange}
            value={wkModif.Name_wk}
            name="Name_wk"
          />
          <input
            type="text"
            name="Type_wk"
            value={wkModif.Type_wk}
            onChange={handleChange}
          />
          </div>
          {activImg === false ? (
            <div className="upload">
              <input
                type="hidden"
                name="Image_wk"
                value={wkModif.Image_wk}
              />
              <img src={wkModif.Image_wk} alt={wkModif.Name_wk} />
              <button className="btn-modif" onClick={() => setActivImg(true)}>
                Modifier
              </button>
            </div>
          ) : (
            <input
              type="file"
              name="Image_wk"
              accept=".png, .jpg, .jpeg, .svg"
              onChange={(event) => {
                handleImgPath(event);
                handleImageChange(event);
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

export default ModifWorktop;
