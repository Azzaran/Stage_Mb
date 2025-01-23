import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import accessoriesServices from "../services/accessoriesServices";
import "../styles/admin.css";

const ModifAcc = () => {
  const { id } = useParams();
  const [accModif, setAccModif] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [activImg, setActivImg] = useState(false);
  const navigate = useNavigate();

  const fetchAccessoriesByID = async () => {
    try {
      const response = await accessoriesServices.fetchAccessoriesByID(id);
      setAccModif(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(accModif);

  // Modifie les infos de la cuisine selectionnez

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setAccModif({ ...accModif, [name]: value });
  };

  const handleModif = async (e) => {
    e.preventDefault();
    try {
      const response = await accessoriesServices.modifAcc(accModif);
      handleImageUpload();
      navigate("/AdminAccessories");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_acc", selectedImage);
      console.log(formData);
      try {
        await axios.post("http://127.0.0.1:3000/uploadacc", formData, {
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
    setAccModif({ ...accModif, [name]: "\\" + filename });
  };

  useEffect(() => {
    fetchAccessoriesByID();
  }, []);

  return (
    <>
      <h1>Modifier une cuisine</h1>
      <div className="modif-form">
        <form
          action="/uploadacc"
          method="POST"
          encType=" multipart/form-data"
          className="modif-items"
          onSubmit={handleModif}
        >
          <input type="hidden" value={accModif.Id_acc || ""} name="Id_acc" />
          <input
            type="text"
            onChange={handleChange}
            value={accModif.Name_acc}
            name="Name_acc"
          />
          {activImg === false ? (
            <div className="upload">
              <input
                type="hidden"
                name="Image_acc"
                value={accModif.Image_acc}
              />
              <img src={accModif.Image_acc} alt={accModif.Name_acc} />
              <button className="btn-modif" onClick={() => setActivImg(true)}>
                Modifier
              </button>
            </div>
          ) : (
            <input
              type="file"
              name="Image_acc"
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

export default ModifAcc;
