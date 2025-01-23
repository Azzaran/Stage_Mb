import React from "react";
import Auth from "../services/auth";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "../styles/connexion.css";
// import adminService from "../Services/adminServices";

const Auth0 = new Auth();
const Connexion = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [admins, setAdmins] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setAdmins({ ...admins, [name]: value });
  };

  //   const handleAdd = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await adminService.addAdmin(admin);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     console.log(admin);
  //   };

  const handleConn = async (e) => {
    e.preventDefault();
    try {
      const response = await Auth0.authenticate(admins);
      setTimeout(() => {
        setIsAuthenticated(true);
        navigate("/AdminKitchen");
        setUser(Auth0.getUser());
      }, 800);
    } catch (e) {
    }
  };

  return (
    <div className="connpage">
      <form method="POST" onSubmit={handleConn} className="formconn">
        <h1 className="titreco">Connectez-vous</h1>
        <div className="conncontent">
          <input
            type="email"
            name="MailConn_admin"
            placeholder="Adresse mail"
            value={admins.MailConn_admin}
            onChange={handleChange}
            size="30"
            className="coord"
            required
          />
          <input
            type="password"
            name="PwdConn_admin"
            placeholder="Mot de passe"
            value={admins.PwdConn_admin}
            onChange={handleChange}
            className="coord"
            required
          />
          <button type="submit" className="btn" id="btnco">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Connexion;
