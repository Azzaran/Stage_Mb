import axios from "axios";

function fetchProfile() {
    return axios.get("http://127.0.0.1:3000/profil");
}

function modifyProfile(profil) {
    return axios.patch("http://127.0.0.1:3000/profil" , profil , {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

export default{
    fetchProfile,
    modifyProfile
}