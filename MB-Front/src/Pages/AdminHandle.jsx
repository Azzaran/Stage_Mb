import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import handleServices from "../services/handleServices";
import Modifier from "../assets/crayon-modifier.svg";
import Supprimer from "../assets/supprimer.svg";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

const AdminHandle = () => {
  const [handle, setHandle] = useState([]);
  const [handles, setHandles] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const fetchHandle = async () => {
    try {
      const response = await handleServices.fetchHandle();
      setHandle(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setHandles({ ...handles, [name]: value });
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
    setHandles({ ...handles, [name]: "\\" + filename });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await handleServices.addHandle(handles);
      handleImageUpload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_hand", selectedImage);
      try {
        await axios.post("http://127.0.0.1:3000/uploadhandle", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Handle uploaded successfully!");
      } catch (error) {
        console.error("Error uploading handle:", error);
      }
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0])};

  const handleDelete = async (ID) => {
    try {
      await handleServices.deleteHandleById(ID);
      window.location.reload();
    } catch (e) {
      console.log("Erreur lors de la suppression de la cuisine : ", e);
    }
  };
  

  useEffect(() => {
    fetchHandle();
  }, []);

  return (
    <>
      <h1>Page admin poignées</h1>
      <div className="add-form">
        <h2>Ajouter une Poignée</h2>
        <form
          action="/uploadhandle"
          method="POST"
          encType=" multipart/form-data"
          className="add-items"
          onSubmit={handleAdd}
        >
          <input
            type="text"
            name="Name_hand"
            value={handles.Name_hand}
            onChange={handleChange}
          />
          <input
            type="file"
            name="Image_hand"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              handleImgPath(event);
              handleImageChange(event);
            }}
          />
          <input
            type="text"
            name="Dimension_hand"
            value={handles.Dimension_hand}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Material_hand"
            value={handles.Material_hand}
            onChange={handleChange}
          />
          <button type="submit" value="envoyer" className="btn">
            Envoyer
          </button>
        </form>
      </div>
      <br />
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom:</th>
            <th>Image:</th>
            <th>Dimension:</th>
            <th>Matériel:</th>
          </tr>
        </thead>
        <tbody>
          {handle.map((han, index) => (
            <tr key={han.Id_hand || index}>
              <td className="kitbox">{han.Name_hand}</td>
              <td className="kitbox">
                <img src={han.Image_hand} alt={han.Name_hand} />
              </td>
              <td className="kitbox">{han.Dimension_hand}</td>
              <td className="kitbox">{han.Material_hand}</td>
              <td className="kitbox">
                <img
                  src={Modifier}
                  alt="crayon_modifier"
                  className="ad-img"
                  onClick={() => {
                    navigate("/AdminHandle/" + han.Id_hand);
                  }}
                />
                <img
                  src={Supprimer}
                  alt="corbeille_supprimer"
                  className="ad-img"
                  onClick={() => {
                    handleDelete(han.Id_hand);
                  }}
                />
              </td>
            </tr>
          ))}
          ;
        </tbody>
      </table>
    </>
  );
};

export default AdminHandle;
