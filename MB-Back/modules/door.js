const express = require("express");
const doorService = require("../services/doorService");
const router = express.Router();

router.get("/", (req, res) => {
  doorService
    .fetchDoor()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.get("/:IdDoor", (req, res) => {
  const patchDoor = req.params.IdDoor;
  doorService
    .fetchDoorById(patchDoor)
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.post("/", (req, res) => {
  let data = req.body;
  doorService
    .addDoor(data)
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
  doorService
    .modifDoor(data)
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.delete("/:Id_door", (req, res) => {
  const doorId = req.params.Id_door;
  doorService
    .deleteDoorById(doorId)
    .then((result) => {
      console.log("porte supprimée :", doorId);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error" + err.sqlMessage });
    });
});

module.exports = router;
