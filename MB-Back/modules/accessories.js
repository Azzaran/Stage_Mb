const express = require("express");
const accessoriesService= require("../services/accessoriesService");
const router = express.Router();

router.get("/", (req, res) => {
    accessoriesService.fetchAccessories().then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.json({ message: "Error" + err.sqlMessage });
      });
  });

  router.get("/:IdAcc", (req, res) => {
    const patchAcc = req.params.IdAcc;
    accessoriesService.fetchAccessoriesByID(patchAcc).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
  });
  

  router.post("/", (req, res) => {
    let data = req.body;
    accessoriesService
      .addAccessories(data)
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
    accessoriesService
      .modifAccessories(data)
      .then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.json({ message: "Error" + err.sqlMessage });
      });
  });
  router.delete("/:Id_acc", (req, res) => {
    const accId = req.params.Id_acc; 
    accessoriesService.deleteAccessoriesById(accId)
        .then(result => {
            console.log("accessoire supprimé :", accId);
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({"message": "Error" + err.sqlMessage});
        });
});

  module.exports = router;