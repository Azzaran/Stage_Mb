import axios from "axios";

function fetchDoor() {
    return axios.get("http://localhost:3000/door");
  }

  function fetchDoorByID(Id_door) {
    return axios.get(`http://localhost:3000/door/${Id_door}`);
  }
  

  function addDoor(doorb) {
    return axios.post("http://127.0.0.1:3000/door", doorb, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function modifDoor(doorModif) {
    return axios.patch("http://127.0.0.1:3000/door/" ,doorModif , {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function deleteDoorById(Id_door) {
    return axios.delete(`http://localhost:3000/door/${Id_door}`);
  }

export default {
    fetchDoor,
    addDoor,
    modifDoor,
    fetchDoorByID,
    deleteDoorById
}