import axios from "axios";

function fetchWorktop() {
    return axios.get("http://localhost:3000/worktop");
  }

  function fetchWorktopByID(Id_wk) {
    return axios.get(`http://localhost:3000/worktop/${Id_wk}`);
  }
  

  function addWorktop(worktops) {
    return axios.post("http://127.0.0.1:3000/worktop", worktops, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function modifWorktop(worktopModif) {
    return axios.patch("http://127.0.0.1:3000/worktop/" ,worktopModif , {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  function deleteWorktopById(Id_wk) {
    return axios.delete(`http://localhost:3000/worktop/${Id_wk}`);
  }

  export default {
    fetchWorktop,
    fetchWorktopByID,
    addWorktop,
    modifWorktop,
    deleteWorktopById
  }