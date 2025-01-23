import axios from "axios";

function fetchKitchen() {
  return axios.get("http://localhost:3000/kitchen");
}
function fetchKitchByID(Id_kitch) {
  return axios.get(`http://localhost:3000/kitchen/${Id_kitch}`);
}

function fetchFiveImgKitch() {
  return axios.get("http://localhost:3000/kitchen/img");
}

function addKitchen(kitchen) {
  return axios.post("http://127.0.0.1:3000/kitchen", kitchen, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function modifKitchen(kitchModif) {
  return axios.patch("http://127.0.0.1:3000/kitchen/" ,kitchModif , {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function deleteKitchenById(Id_kitch) {
  return axios.delete(`http://localhost:3000/kitchen/${Id_kitch}`);
}

export default {
  fetchKitchen,
  fetchKitchByID,
  fetchFiveImgKitch,
  addKitchen,
  modifKitchen,
  deleteKitchenById,
};
