import axios from "axios";

function addGallery(gallery) {
  return axios.post("http://127.0.0.1:3000/gallery", gallery, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function fetchGallery() {
  return axios.get("http://localhost:3000/gallery");
}

function fetchGalleryTrust() {
  return axios.get("http://localhost:3000/gallery/trust");
}

function deleteGalleryById(Id_gallery) {
  return axios.delete(`http://localhost:3000/gallery/${Id_gallery}`);
}

export default {
  addGallery, 
  fetchGallery,
  fetchGalleryTrust,
  deleteGalleryById
}