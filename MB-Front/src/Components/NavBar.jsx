import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/mbcuisines-removebg.png";
import MenuBurger from "../assets/menu_burger.svg";
import Arrowdown from "../assets/Arrowdown.svg";
import Calendar from "../assets/calendar_month.svg";
import AuthContext from "./AuthContext";
import Auth from "../services/auth";

const NavBar = () => {
  // État pour gérer l'ouverture/fermeture du menu
  const [isActive, setIsActive] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const Auth0 = new Auth();
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeco = async () => {
    try {
      setIsAuthenticated(false);
      Auth0.logout();
      setUser(null);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };


  const handleLogoClick = () => {
    navigate("/"); // Rediriger vers la page d'accueil
    // window.location.reload(); // Actualiser la page
  };

  const handleLinkClick = () => {
    window.reload(); // Actualiser la page lors du clic sur un lien
  };

  // Fonction pour fermer le menu
  const closeMenu = () => {
    setIsActive(false);
  };

  // État pour déterminer si la barre de navigation doit être fixée en haut de la page
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // Si le défilement est supérieur à 0 pixels
        setIsFixed(true); // Fixer la navbar
      } else {
        setIsFixed(false); // Sinon, rendre la position de la barre de navigation relative
      }
    };

    // Ajout d'un écouteur d'événement de défilement lors du montage du composant
    window.addEventListener("scroll", handleScroll);

    // Suppression de l'écouteur d'événement de défilement lors du démontage du composant pour éviter les fuites de mémoire
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  

  return (
    <>
      {isAuthenticated === false ? (
        <div
          className="navbar"
          style={{ position: isFixed ? "fixed" : "relative" }}
        >
          <p className="navbar-title">
            <Link to={"/"} onClick={handleLogoClick}>
              <img src={Logo} id="logo" alt="Logo" placeholder="Logo" />
            </Link>
          </p>

          {/* Liens de navigation */}
          <div className={isActive ? "nav-links active" : "nav-links"}>
            <div
              className="lien_nav"
              onClick={() => {
                setIsDropDown(!isDropDown);
              }}
            >
              Cuisines <img src={Arrowdown} />
              <div
                className={
                  isDropDown ? "dropdown-content active" : "dropdown-content"
                }
              >
                <Link to={"/cuisines"} className="lien_nav" onClick={closeMenu}>
                  Nos Cuisines
                </Link>
                <Link
                  to={"/plandetravail"}
                  className="lien_nav"
                  onClick={() => {closeMenu(); handleLinkClick();}}
                >
                  Nos Plans de travail
                </Link>
                <Link
                  to={"/accessoires#acc"}
                  className="lien_nav"
                  onClick={closeMenu}
                >
                  Nos Accessoires
                </Link>
                <Link
                  to={"/accessoires#hand"}
                  className="lien_nav"
                  onClick={closeMenu}
                >
                  Nos Poignées
                </Link>
              </div>
            </div>
            <Link to={"/portes"} className="lien_nav" onClick={closeMenu}>
              Portes
            </Link>
            <Link to={"/realisation"} className="lien_nav" onClick={closeMenu}>
              Réalisations
            </Link>
            <Link to={"/contact"} className="btn" onClick={closeMenu}>
              <img src={Calendar} alt="Calendrier" className="calendar" />
              Contactez-nous
            </Link>
          </div>

          {/* Menu burger pour afficher le menu sur les appareils mobiles */}
          <img
            src={MenuBurger}
            alt="menu burger"
            className="menu_burger"
            onClick={() => {
              setIsActive(!isActive); // Inversion de l'état isActive lors du clic sur le menu burger
            }}
          />
        </div>
      ) : (
        <>
          <div
            className="navbar"
            style={{ position: isFixed ? "fixed" : "relative" }}
          >
            <p className="navbar-title">
              <img src={Logo} id="logo" alt="Logo" placeholder="Logo" />
            </p>
            {/* Liens de navigation */}
            <div className={isActive ? "nav-links active" : "nav-links"}>
              <Link
                to={"/AdminProfil"}
                className="lien_nav"
                onClick={closeMenu}
              >
                Profil
              </Link>
              <Link
                to={"/AdminKitchen"}
                className="lien_nav"
                onClick={closeMenu}
              >
                Cuisines
              </Link>
              <Link to={"/AdminDoor"} className="lien_nav" onClick={closeMenu}>
                Portes
              </Link>
              <Link
                to={"/AdminWorktop"}
                className="lien_nav"
                onClick={closeMenu}
              >
                Plans de travail
              </Link>
              <Link
                to={"/AdminHandle"}
                className="lien_nav"
                onClick={closeMenu}
              >
                Poignées
              </Link>
              <Link
                to={"/AdminAccessories"}
                className="lien_nav"
                onClick={closeMenu}
              >
                Accessoires
              </Link>
              <Link
                to={"/AdminGallery"}
                className="lien_nav"
                onClick={closeMenu}
              >
                Galerie
              </Link>
              <Link to={"/"} onClick={handleDeco} className="btn">
                Déconnexion
              </Link>
            </div>

            {/* Menu burger pour afficher le menu sur les appareils mobiles */}
            <img
              src={MenuBurger}
              alt="menu burger"
              className="menu_burger"
              onClick={() => {
                setIsActive(!isActive); // Inversion de l'état isActive lors du clic sur le menu burger
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
