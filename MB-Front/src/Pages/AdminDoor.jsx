import React from "react";
import { useState, useEffect } from "react";
import doorServices from "../services/doorServices";
import Modifier from "../assets/crayon-modifier.svg";
import Supprimer from "../assets/supprimer.svg";
import axios from "axios";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

const AdminDoor = () => {
  const [doors, setDoors] = useState([]);
  const [doorb, setDoorb] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const fetchDoors = async () => {
    try {
      const response = await doorServices.fetchDoor();
      setDoors(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setDoorb({ ...doorb, [name]: value });
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
    setDoorb({ ...doorb, [name]: "\\" + filename });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await doorServices.addDoor(doorb);
      handleImageUpload();
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
        console.log("Door uploaded successfully!");
      } catch (error) {
        console.error("Error uploading door:", error);
      }
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleDelete = async (ID) => {
    try {
      await doorServices.deleteDoorById(ID);
      window.location.reload();
    } catch (e) {
      console.log("Erreur lors de la suppression de la cuisine : ", e);
    }
  };


  useEffect(() => {
    fetchDoors();
  }, []);

  return (
    <>
      <h1>Page admin portes</h1>
      <div className="add-form">
        <h2>Ajouter une Porte</h2>
        <form
          action="/upload"
          method="POST"
          encType=" multipart/form-data"
          className="add-items"
          onSubmit={handleAdd}
        >
          <input
            type="text"
            name="Name_door"
            value={doors.Name_door}
            onChange={handleChange}
          />
          <input
            type="file"
            name="Image_door"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              handleImgPath(event);
              handleImageChange(event);
            }}
          />
          <input
            type="text"
            name="Height_door"
            value={doors.Height_door}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Width_door"
            value={doors.Width_door}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Descr_door"
            value={doors.Descr_door}
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
            <th>Hauteur:</th>
            <th>Largeur:</th>
            <th>Description:</th>
          </tr>
        </thead>
        <tbody>
          {doors.map((doo, index) => (
            <tr key={doo.Id_door || index}>
              <td className="kitbox">{doo.Name_door}</td>
              <td className="kitbox">
                <img src={doo.Image_door} alt={doo.Name_door} />
              </td>
              <td className="kitbox">{doo.Height_door}</td>
              <td className="kitbox">{doo.Width_door}</td>
              <td className="kitbox">{doo.Descr_door}</td>
              <td className="kitbox">
                <img
                  src={Modifier}
                  alt="crayon_modifier"
                  className="ad-img"
                  onClick={() => {
                    navigate("/AdminDoor/" + doo.Id_door);
                  }}
                />
                <img
                  src={Supprimer}
                  alt="corbeille_supprimer"
                  className="ad-img"
                  onClick={() => {
                    handleDelete(doo.Id_door);
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

export default AdminDoor;
