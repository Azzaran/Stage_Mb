import React from "react";
import { useState, useEffect } from "react";
import worktopServices from "../services/worktopServices";
import Modifier from "../assets/crayon-modifier.svg";
import Supprimer from "../assets/supprimer.svg";
import axios from "axios";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

const AdminWorktop = () => {
  const [worktop, setWorktop] = useState([]);
  const [worktops, setWorktops] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const fetchWorktop = async () => {
    try {
      const response = await worktopServices.fetchWorktop();
      setWorktop(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setWorktops({ ...worktops, [name]: value });
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
    setWorktops({ ...worktops, [name]: "\\" + filename });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await worktopServices.addWorktop(worktops);
      handleImageUpload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_wk", selectedImage);
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

  const handleDelete = async (ID) => {
    try {
      await worktopServices.deleteWorktopById(ID);
      window.location.reload();
    } catch (e) {
      console.log("Erreur lors de la suppression de la cuisine : ", e);
    }
  };

  useEffect(() => {
    fetchWorktop();
  }, []);
  return (
    <>
      <h1>Page admin plan de travail</h1>
      <div className="add-form">
        <h2>Ajouter un Plan de travail</h2>
        <form
          action="/upload"
          method="POST"
          encType=" multipart/form-data"
          className="add-items"
          onSubmit={handleAdd}
        >
          <input
            type="text"
            name="Name_wk"
            value={worktops.Name_wk}
            onChange={handleChange}
          />
          <input
            type="file"
            name="Image_wk"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              handleImgPath(event);
              handleImageChange(event);
            }}
          />
          <input
            type="text"
            name="Type_wk"
            value={worktops.Type_wk}
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
            <th>Type:</th>
          </tr>
        </thead>
        <tbody>
          {worktop.map((wor, index) => (
            <tr key={wor.Id_wk || index}>
              <td className="kitbox">{wor.Name_wk}</td>
              <td className="kitbox">
                <img src={wor.Image_wk} alt={wor.Name_wk} />
              </td>
              <td className="kitbox">{wor.Type_wk}</td>
              <td className="kitbox">
                <img
                  src={Modifier}
                  alt="crayon_modifier"
                  className="ad-img"
                  onClick={() => {
                    navigate("/AdminWorktop/" + wor.Id_wk);
                  }}
                />
                <img
                  src={Supprimer}
                  alt="corbeille_supprimer"
                  className="ad-img"
                  onClick={() => {
                    handleDelete(wor.Id_wk);
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

export default AdminWorktop;
