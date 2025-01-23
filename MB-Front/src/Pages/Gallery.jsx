import React, { useEffect, useState } from "react";
import galleryServices from "../services/galleryServices";
import Handshake from "../assets/handshake.svg";
import "../styles/gallery.css";


const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const fetchGallery = async () => {
    try {
      const response = await galleryServices.fetchGallery();
      setGallery(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Fonction pour regrouper les photos par nom de client
  const groupPhotosByClient = () => {
    return gallery.reduce((acc, galleryItem) => {
      if (!acc[galleryItem.Name_gallery]) {
        acc[galleryItem.Name_gallery] = [];
      }
      acc[galleryItem.Name_gallery].push(galleryItem);
      return acc;
    }, {});
  };
 
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="page-gallery">
      <div className="trusttitle-gallery">
        <h1>Ils nous ont fait confiance</h1>
        <img src={Handshake} alt="handshake" className="icon" />
      </div>
      <div className="container-gallery">
        {/* Regrouper les photos par nom de client */}
        {Object.entries(groupPhotosByClient()).map(([clientName, photos]) => (
          <div key={clientName} className="card-gallery">
            <h2 className="client-gallery">{clientName}</h2>
            <div className="client-photos">
              {photos.map((photo, index) => (
                <img
                  key={photo.Id_gallery || index}
                  src={photo.Image_gallery}
                  alt={photo.Name_gallery}
                  className="imgGallery"
                  onClick={() => handlePhotoClick(photo, index)}
                />
              ))}
            </div>
          </div>
        ))}
        {/* Affichage de l'image agrandie en modal */}
        {selectedPhoto !== null && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content">
              <img
                src={selectedPhoto.Image_gallery}
                alt={selectedPhoto.Name_gallery}
                className="modal-image"
              />
              <button className="close-button" onClick={handleCloseModal}>
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Gallery;

