const express = require("express");
const galleryService= require("../services/galleryService");
const router = express.Router();

  router.get("/", (req, res) => {
    galleryService.fetchGallery().then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        console.error( err);
        res.json({ message: "Error" + err.sqlMessage });
      });
  });

  router.get("/trust", (req, res) => {
    galleryService.fetchGalleryTrust().then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        console.error( err);
        res.json({ message: "Error" + err.sqlMessage });
      });
  });

  router.post("/", (req, res) => {
    let data = req.body;
    galleryService
      .addGallery(data)
      .then((result) => {
        res.status(201);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Votre ajout ne s'est pas bien passé" });
      });
  });
  
  router.delete("/:Id_gallery", (req, res) => {
    const galleryId = req.params.Id_gallery;
    galleryService.deleteGalleryById(galleryId)
      .then(result => {
        console.log("photo supprimée :", galleryId);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({"message": "Error" + err.sqlMessage})
      });
  });
  module.exports = router;