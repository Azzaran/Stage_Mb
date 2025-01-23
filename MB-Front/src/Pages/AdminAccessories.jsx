import React from "react";
import { useState, useEffect } from "react";
import accessoriesServices from "../services/accessoriesServices";
import Modifier from "../assets/crayon-modifier.svg";
import Supprimer from "../assets/supprimer.svg";
import axios from "axios";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

const AdminAccessories = () => {
  const [accessory, setAccessory] = useState([]);
  const [accessories, setAccessories] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const fetchAccessories = async () => {
    try {
      const response = await accessoriesServices.fetchAccessories();
      setAccessory(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setAccessories({ ...accessories, [name]: value });
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
    setAccessories({ ...accessories, [name]: "\\" + filename });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await accessoriesServices.addAccessories(accessories);
      handleImageUpload();
    } catch (e) {
      console.log(e);
    }
  };
  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_acc", selectedImage);
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

  const handleDelete = async (ID) => {
    try {
      await accessoriesServices.deleteAccById(ID);
      window.location.reload();
    } catch (e) {
      console.log("Erreur lors de la suppression de la cuisine : ", e);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);
  return (
    <>
      <h1>Page admin accessories</h1>
      <div className="add-form">
        <h2>Ajouter un Accessoire</h2>
        <form
          action="/upload"
          method="POST"
          encType=" multipart/form-data"
          className="add-items"
          onSubmit={handleAdd}
        >
          <input
            type="text"
            name="Name_acc"
            value={accessories.Name_acc}
            onChange={handleChange}
          />
          <input
            type="file"
            name="Image_acc"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              handleImgPath(event);
              handleImageChange(event);
            }}
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
          </tr>
        </thead>
        <tbody>
          {accessory.map((acc, index) => (
            <tr key={acc.Id_acc || index}>
              <td className="kitbox">{acc.Name_acc}</td>
              <td className="kitbox">
                <img src={acc.Image_acc} alt={acc.Name_acc} />
              </td>
              <td className="kitbox">
                <img src={Modifier} alt="crayon_modifier" className="ad-img" onClick={() => {
                    navigate("/AdminAccessories/" + acc.Id_acc);
                  }}/>
                <img
                  src={Supprimer}
                  alt="corbeille_supprimer"
                  className="ad-img"
                  onClick={() => {
                    handleDelete(acc.Id_acc);
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
export default AdminAccessories;