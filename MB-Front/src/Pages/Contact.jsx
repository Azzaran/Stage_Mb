import React, { useState, useEffect } from "react";
import "../styles/contact.css";
import profilServices from "../services/profileServices";
import Belgique from "../assets/belgique.svg";
import France from "../assets/france.svg";
import Dimension from "../assets/3d.svg";
import Fiche from "../assets/profil.svg";
import Email from "../assets/enveloppe.svg";
import Tel from "../assets/tel.svg";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [profil, setProfil] = useState([]);
  const [capVal, setCapVal] = useState("");
  const [send, setSend] = useState({
    Nom: "",
    Prénom: "",
    Email: "",
    Message: "",
    Motif: "",
    Fichier: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await profilServices.fetchProfile();
      setProfil(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setSend({ ...send, [name]: value });
  };

  console.log(send);

  // const handleAdd = async (e) => {
  //   e.preventDefault();
  //   if (!capVal) {
  //     toast.error("Veuillez remplir le captcha.");
  //     return;
  //   }
  //   try {
  //     const response = await galleryServices.addGallery(gallery);
  //     handleImageUpload();
  //     console.log(response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const handleImageUpload = async () => {
  //   if (selectedImage) {
  //     const formData = new FormData();
  //     formData.append("Image_gallery", selectedImage);
  //     console.log(formData);
  //     try {
  //       await axios.post("http://127.0.0.1:3000/upload", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       console.log("Image uploaded successfully!");
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     }
  //   }
  // };

  // const handleImageChange = (event) => {
  //   setSelectedImage(event.target.files[0]);
  // };


  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div className="bannercontact">
        <div className="bannertexcon">
          <h1 className="titlecontact">
            Contactez nous pour plus d'informations
          </h1>
        </div>
      </div>
      <div className="contact">
        <form
          method="POST"
          className="formcontact"
          encType=" multipart/form-data"
        >
          <label for="surnamecontact" className="fontlabel">
            Nom:
          </label>
          <input
            id="surnamecontact"
            type="text"
            className="inputcontact"
            name="Nom"
            value={send.Nom}
            onChange={handleChange}
            required
          ></input>
          <label for="namecontact" className="fontlabel">
            Prénom:
          </label>
          <input
            id="namecontact"
            type="text"
            className="inputcontact"
            name="Prénom"
            value={send.Prénom}
            onChange={handleChange}
            required
          ></input>
          <label for="emailcontact" className="fontlabel">
            Email:
          </label>
          <input
            id="emailcontact"
            type="text"
            className="inputcontact"
            name="Email"
            value={send.Email}
            onChange={handleChange}
            required
          ></input>
          <label for="messagecontact" className="fontlabel" required>
            Message:
          </label>
          <textarea
            id="messagecontact"
            className="inputcontact"
            rows="10"
            name="Message"
            value={send.Message}
            onChange={handleChange}
          ></textarea>
          <label for="reasoncontact" className="fontlabel">
            Motif:
          </label>
          <select
            id="reasoncontact"
            className="inputcontact"
            name="Motif"
            onChange={handleChange}
          >
            <option>--Choisissez un motif--</option>
            <option value="Prise de rendez-vous">Prise de rendez-vous</option>
            <option value="Demande de devis">Demande de devis</option>
          </select>
          <label for="filecontact" className="fontlabel">
            Joindre un fichier:
          </label>
          <input
            id="filecontact"
            type="file"
            className="inputcontact"
            name="Fichier"
            value={send.Fichier}
            onChange={handleChange}
          ></input>
          <ReCAPTCHA
                  sitekey="6LfRa7UpAAAAAKBC3dg21_mDVLna101BrEHPLpXo"
                  onChange={(val) => setCapVal(val)}
                />
          <button className="btncontact" type="submit">
            Envoyer
          </button>
        </form>
        <div className="infocontact">
          <div className="devis">
            <h1 className="titlep">Devis Gratuit</h1>
            <img src={Dimension} alt="logo_3d" className="dimicon" />
          </div>
          <div className="devis">
            <img src={Fiche} alt="fichier" className="contacticon" />
            <h1 className="titlep">Contact</h1>
            <p className="infop">{profil.Name_profile} - Gérant</p>
          </div>
          <div className="devis">
            <img src={Tel} alt="tel" className="contacticon" />
            <h1 className="titlep">Tel:</h1>
            <p className="infop">
              <img src={Belgique} alt="Belgique" id="icons" /> :{" "}
              {profil.Phone_Belgian}
            </p>
            <p className="infop">
              <img src={France} alt="France" id="icons" /> :{" "}
              {profil.Phone_French}
            </p>
          </div>
          <div className="devis">
            <img src={Email} alt="mail" className="contacticon" />
            <h1 className="titlep">Email:</h1>
            <p className="infop">{profil.Email}</p>
          </div>
          <h3 className="confort">
            Pour votre confort, notre showroom est ouvert uniquement sur
            rendez-vous.
          </h3>
        </div>
      </div>
      <div className="line"></div>

       <div className="description">
        <div className="desc">
          Description de l'entreprise Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249669.73424061792!2d3.1202698971969367!3d50.65416011272231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c32744ac3fbddb%3A0x180996725cf38ce3!2sMBcuisines!5e0!3m2!1sfr!2sfr!4v1712216613596!5m2!1sfr!2sfr"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <script src="https://www.google.com/recaptcha/api.js"></script>
    </>
  );
};

export default Contact;
