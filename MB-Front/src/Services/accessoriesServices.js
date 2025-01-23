import axios from "axios";

function fetchAccessories() {
    return axios.get("http://localhost:3000/accessories");
  }

  function fetchAccessoriesByID(Id_acc) {
    return axios.get(`http://localhost:3000/accessories/${Id_acc}`);
  }
  
  function addAccessories(accessories) {
    return axios.post("http://127.0.0.1:3000/accessories", accessories, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function modifAcc(accModif) {
    return axios.patch("http://127.0.0.1:3000/accessories/" ,accModif , {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function deleteAccById(Id_acc) {
    return axios.delete(`http://localhost:3000/accessories/${Id_acc}`);
  }


  export default {
    fetchAccessories,
    fetchAccessoriesByID,
    addAccessories,
    modifAcc,
    deleteAccById
  }