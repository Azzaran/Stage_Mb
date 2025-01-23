const express = require("express");
const worktopService= require("../services/worktopService");
const router = express.Router();

  router.get("/", (req, res) => {
    worktopService.fetchWorktop().then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.json({ message: "Error" + err.sqlMessage });
      });
  });

  router.get("/:IdWorktop", (req, res) => {
    const patchWorktop = req.params.IdWorktop;
    worktopService.fetchWorktopByID(patchWorktop).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
  });
  

  router.post("/", (req, res) => {
    let data = req.body;
    worktopService
      .addWorktop(data)
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
    worktopService
      .modifWorktop(data)
      .then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.json({ message: "Error" + err.sqlMessage });
      });
  });
  
  router.delete("/:Id_wk", (req, res) => {
    const wkId = req.params.Id_wk; 
    worktopService.deleteWorktopById(wkId)
        .then(result => {
            console.log("worktop supprimé :", wkId);
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({"message": "Error" + err.sqlMessage});
        });
});
  

  module.exports = router;