const express = require("express");
const handleService = require("../services/handleService");
const router = express.Router();

  router.get("/", (req, res) => {
    handleService.fetchHandle().then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.json({ message: "Error" + err.sqlMessage });
      });
  });

  router.get("/:IdHandle", (req, res) => {
    const patchHandle = req.params.IdHandle;
    handleService.fetchHandleByID(patchHandle).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
  });
  
  router.post("/", (req, res) => {
    let data = req.body;
    handleService.addhandle(data)
      .then((result) => {
        res.status(201);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Votre ajout ne s'est pas bien passé" });
      });
  });

  router.patch("/", (req, res) => {
    let data = req.body;
    console.log(data);
    handleService
      .modifHandle(data)
      .then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.json({ message: "Error" + err.sqlMessage });
      });
  });
  
  router.delete("/:Id_hand", (req, res) => {
    const handId = req.params.Id_hand; 
    handleService.deleteHandleById(handId)
        .then(result => {
            console.log("poignée supprimée :", handId);
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({"message": "Error" + err.sqlMessage});
        });
});

  module.exports = router;