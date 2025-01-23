import React, { useEffect, useState } from "react";
import doorServices from "../services/doorServices";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";

const ModifDoor = () => {
  const { id } = useParams();
  const [doorModif, setDoorModif] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [activImg, setActivImg] = useState(false);
  const navigate = useNavigate();

  const fetchDoorByID = async () => {
    try {
      const response = await doorServices.fetchDoorByID(id);
      setDoorModif(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(doorModif);

  // Modifie les infos de la cuisine selectionne

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setDoorModif({ ...doorModif, [name]: value });
  };

  const handleModif = async (e) => {
    e.preventDefault();
    try {
      const response = await doorServices.modifDoor(doorModif);
      handleImageUpload();
      navigate("/AdminDoor")
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_door", selectedImage);
      console.log(formData);
      try {
        await axios.post("http://127.0.0.1:3000/uploaddoor", formData, {
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
    setDoorModif({ ...doorModif, [name]: "\\" + filename });
  };

  useEffect(() => {
    fetchDoorByID();
  }, []);

  return (
    <>
      <h1>Modifier une cuisine</h1>
      <div className="modif-form">
      <form
        action="/uploaddoor"
        method="POST"
        encType=" multipart/form-data"
        className="modif-items"
        onSubmit={handleModif}
      >
        <input type="hidden" value={doorModif.Id_door || ""} name="Id_door" />
        <input
          type="text"
          onChange={handleChange}
          value={doorModif.Name_door}
          name="Name_door"
        />
        {activImg === false ? (
          <div className="upload">
            <input
              type="hidden"
              name="Image_door"
              value={doorModif.Image_door}
            />
            <img src={doorModif.Image_door} alt={doorModif.Name_door} />
            <button className="btn-modif" onClick={() => setActivImg(true)}>
              Modifier
            </button>
          </div>
        ) : (
          <input
            type="file"
            name="Image_door"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              handleImgPath(event);
              handleImageChange(event);
            }}
          />
        )}
        <input
          type="text"
          name="Height_door"
          value={doorModif.Height_door}
          onChange={handleChange}
        />

        <input
          type="text"
          name="Width_door"
          value={doorModif.Width_door}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Descr_door"
          value={doorModif.Descr_door}
          onChange={handleChange}
        />
        <button
          type="submit"
          value="Ajouter"
          className="btn"
          
        >
          Enregistrer les modifications
        </button>
      </form>
      </div>
    </>
  );
};

export default ModifDoor;
