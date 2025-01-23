import axios from "axios";

function fetchHandle() {
    return axios.get("http://localhost:3000/handle");
  }

  function fetchHandleByID(Id_hand) {
    return axios.get(`http://localhost:3000/handle/${Id_hand}`);
  }

function addHandle(handles) {
    return axios.post("http://127.0.0.1:3000/handle", handles, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function modifHandle(handleModif) {
    return axios.patch("http://127.0.0.1:3000/handle/" ,handleModif , {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function deleteHandleById(Id_hand) {
    return axios.delete(`http://localhost:3000/handle/${Id_hand}`);
  }
  

  export default {
    fetchHandle, 
    fetchHandleByID,
    addHandle,
    modifHandle,
    deleteHandleById
  }