import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import galleryServices from "../services/galleryServices";
import Supprimer from "../assets/supprimer.svg";
import "../styles/admin.css";

const AdminGallery = () => {
  const [gallery, setGallery] = useState({});
  const [galleries, setGalleries] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchGallery = async () => {
    try {
      const response = await galleryServices.fetchGallery();
      setGalleries(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setGallery({ ...gallery, [name]: value });
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
    setGallery({ ...gallery, [name]: "\\" + filename });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await galleryServices.addGallery(gallery);
      handleImageUpload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("Image_gallery", selectedImage);
      try {
        await axios.post("http://127.0.0.1:3000/upload", formData, {
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
      await galleryServices.deleteGalleryById(ID);
      window.location.reload();
    } catch (e) {
      console.log("Erreur lors de la suppression de la cuisine : ", e);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      <h1>Page admin galerie</h1>
      <div className="add-form">
        <h2>Ajouter une Photo</h2>
      <form
        action="/upload"
        method="POST"
        encType=" multipart/form-data"
        className="add-items"
        onSubmit={handleAdd}
      >
        <input
          type="text"
          name="Name_gallery"
          value={gallery.Name_Gallery}
          onChange={handleChange}
        />
        <input
          type="file"
          name="Image_gallery"
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
          {galleries.map((gal, index) => (
            <tr key={gal.Id_gallery || index}>
              <td className="kitbox">{gal.Name_gallery}</td>
              <td className="kitbox">
                <img src={gal.Image_gallery} alt={gal.Name_gallery} />
              </td>
              <td className="kitbox">
                <img
                  src={Supprimer}
                  alt="corbeille_supprimer"
                  className="ad-img"
                  onClick={() => {
                    handleDelete(gal.Id_gallery);
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

export default AdminGallery;
