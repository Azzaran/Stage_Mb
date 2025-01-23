import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Kitchen from "./pages/Kitchen";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Door from "./pages/Door";
import Gallery from "./pages/Gallery";
import NavBar from "./components/NavBar";
import Connexion from "./pages/Connexion";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiquesConf from "./pages/PolitiquesConf";
import AuthContext from "./components/AuthContext";
import Auth from "./services/auth";
import { useState, useRef, useEffect } from "react";
import AdminProfil from "./pages/AdminProfil";
import AdminKitchen from "./pages/AdminKitchen";
import AdminModifKitchen from "./pages/AdminModifKitchen";
import AdminDoor from "./pages/AdminDoor";
import AdminModifDoor from "./pages/AdminModifDoor";
import AdminWorktop from "./pages/AdminWorktop";
import AdminModifWorktop from "./pages/AdminModifWorktop";
import AdminHandle from "./pages/AdminHandle";
import AdminModifHandle from "./pages/AdminModifHandle";
import AdminAccessories from "./pages/AdminAccessories";
import AdminModifAccessories from "./pages/AdminModifAccessories";
import AdminGallery from "./pages/AdminGallery";
import Accessories from "./pages/Accessories";
import Worktop from "./pages/Worktop";
import ScrollToTop from "./components/ScrollToTop";

const Auth0 = new Auth();
Auth0.setup();

function App() {
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Auth0.isAuthenticated()
  );
  const [user, setUser] = useState(Auth0.getUser());

  useEffect(() => {
    // Calcul de la hauteur du contenu
    if (contentRef.current) {
      const height = contentRef.current.getBoundingClientRect().height;
      setContentHeight(height);
    }
  }, []);

  useEffect(() => {
    // Ajustement de la marge inférieure du pied de page
    if (footerRef.current) {
      footerRef.current.style.marginTop = `${contentHeight}px`;
    }
  }, [contentHeight]);

  return (
    <div className="content" ref={contentRef}>
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
      >
        <BrowserRouter>
        <ScrollToTop/>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cuisines" element={<Kitchen />} />
            <Route path="/portes" element={<Door />} />
            <Route path="/realisation" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentionslegales" element={<MentionsLegales />} />
            <Route path="/politiquesConf" element={<PolitiquesConf />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/accessoires" element={<Accessories />} />
            <Route path="/plandetravail" element={<Worktop />} />
            <Route
              path={"/AdminProfil"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminProfil />
              }
            />
            <Route
              path={"/AdminKitchen"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminKitchen />
              }
            />
            <Route
              path={"/AdminDoor"}
              element={isAuthenticated === false ? <HomePage /> : <AdminDoor />}
            />
            <Route
              path={"/AdminDoor/:id"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminModifDoor />
              }
            />
            <Route
              path={"/AdminKitchen/:id"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminModifKitchen />
              }
            />
            <Route
              path={"/AdminWorktop"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminWorktop />
              }
            />
            <Route
              path={"/AdminWorktop/:id"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminModifWorktop />
              }
            />
            <Route
              path={"/AdminHandle"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminHandle />
              }
            />
            <Route
              path={"/AdminHandle/:id"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminModifHandle />
              }
            />
            <Route
              path={"/AdminAccessories"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminAccessories />
              }
            />
            <Route
              path={"/AdminAccessories/:id"}
              element={
                isAuthenticated === false ? (
                  <HomePage />
                ) : (
                  <AdminModifAccessories />
                )
              }
            />
            <Route
              path={"/AdminGallery"}
              element={
                isAuthenticated === false ? <HomePage /> : <AdminGallery />
              }
            />
          </Routes>
          <Footer ref={footerRef} />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
