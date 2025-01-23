import React, { useEffect, useState } from "react";
import handleServices from "../services/handleServices";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";

const ModifHand = () => {
  const { id } = useParams();
  const [handModif, setHandModif] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [activImg, setActivImg] = useState(false);
  const navigate = useNavigate();

  const fetchHandleByID = async () => {
    try {
      const response = await handleServices.fetchHandleByID(id);
      setHandModif(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(handModif);

  // Modifie les infos de la cuisine selectionne

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setHandModif({ ...handModif, [name]: value });
  };

  const handleModif = async (e) => {
    e.preventDefault();
    try {
      const response = await handleServices.modifHandle(handModif);
      handleImageUpload();
      navigate("/AdminHandle");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_hand", selectedImage);
      console.log(formData);
      try {
        await axios.post("http://127.0.0.1:3000/uploadhandle", formData, {
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
    setHandModif({ ...handModif, [name]: "\\" + filename });
  };

  useEffect(() => {
    fetchHandleByID();
  }, []);

  return (
    <>
      <h1>Modifier une cuisine</h1>
      <div className="modif-form">
      <form
        action="/uploadhandle"
        method="POST"
        encType=" multipart/form-data"
        className="modif-items"
        onSubmit={handleModif}
      >
        <input type="hidden" value={handModif.Id_hand || ""} name="Id_hand" />
        <input
          type="text"
          onChange={handleChange}
          value={handModif.Name_hand}
          name="Name_hand"
        />
        {activImg === false ? (
          <div className="upload">
            <input
              type="hidden"
              name="Image_hand"
              value={handModif.Image_hand}
            />
            <img src={handModif.Image_hand} alt={handModif.Name_hand} />
            <button className="btn-modif" onClick={() => setActivImg(true)}>
              Modifier
            </button>
          </div>
        ) : (
          <input
            type="file"
            name="Image_hand"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              handleImgPath(event);
              handleImageChange(event);
            }}
          />
        )}
        <input
          type="text"
          name="Dimension_hand"
          value={handModif.Dimension_hand}
          onChange={handleChange}
        />

        <input
          type="text"
          name="Material_hand"
          value={handModif.Material_hand}
          onChange={handleChange}
        />
        <button type="submit" value="Ajouter" className="btn">
          Enregistrer les modifications
        </button>
      </form>
      </div>
    </>
  );
};

export default ModifHand;
