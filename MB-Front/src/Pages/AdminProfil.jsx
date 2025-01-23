import React, { useEffect, useState } from "react";
import profileService from "../services/profileServices";
import Modif from "../assets/crayon-modifier.svg";
import "../styles/admin.css";

const AdminProfil = () => {
  const [profile, setProfile] = useState({});
  const [isActive, setIsActive] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await profileService.fetchProfile();
      console.log(response.data);
      setProfile(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  // Modifie les infos du profil
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setProfile({ ...profile, [name]: value });
    console.log("profil", profile);
  };

  const handleModify = async (e) => {
    e.preventDefault();
    try {
      const response = await profileService.modifyProfile(profile);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <h1>Profil de l'admin</h1>
      <div className={isActive ? "profile active" : "profile"}>
        <p>
          <h3>Nom :</h3>
          {profile.Name_profile}
        </p>
        <p>
          <h3>Tel Français :</h3>
          {profile.Phone_French}
        </p>
        <p>
          <h3>Tel Belge :</h3>
          {profile.Phone_Belgian}
        </p>
        <p>
          <h3>Adresse :</h3>
          {profile.Address}
        </p>
        <p>
          <h3>Email :</h3>
          {profile.Email}
        </p>

        <button
          className="btn"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          Modifier le profil
          <img className="img-btn" src={Modif} />{" "}
        </button>
      </div>

      <form
        className={isActive ? "profile-modif " : "profile-modif active"}
        method="post"
        onSubmit={handleModify}
      >
        <input
          type="hidden"
          name="ID_profile"
          value={profile.ID_profile}
          onChange={handleChange}
        />
        <label>
          Nom Profil :
          <input
            type="text"
            name="Name_profile"
            value={profile.Name_profile}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Tel Français :
          <input
            type="tel"
            name="Phone_French"
            value={profile.Phone_French}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Tel Belge:
          <input
            type="tel"
            name="Phone_Belgian"
            value={profile.Phone_Belgian}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Adresse :
          <input
            type="text"
            name="Address"
            value={profile.Address}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Email :
          <input
            type="mail"
            name="Email"
            value={profile.Email}
            onChange={handleChange}
          ></input>
        </label>
        <button
          className="btn"
          type="submit"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          Enregistrer les modifications
        </button>
      </form>
    </>
  );
};

export default AdminProfil;
