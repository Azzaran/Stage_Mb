const express = require("express");
const kitchenService = require("../services/kitchenService");
const router = express.Router();

router.get("/", (req, res) => {
  kitchenService
    .fetchKitchen()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});


router.get("/img", (req, res) => {
  kitchenService
    .fetchFiveImgKitch()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.get("/:IdKitch", (req, res) => {
  const patchKitch = req.params.IdKitch;
  kitchenService.fetchKitchByID(patchKitch).then(result => {
      res.status(200)
      res.json(result);
  }).catch(err => {
      console.error("Oops...", err);
      res.json({"message" : "Error" + err.sqlMessage})
  });
});


router.post("/", (req, res) => {
  let data = req.body;
  kitchenService
    .addKitchen(data)
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
  kitchenService
    .modifKitchen(data)
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.delete("/:Id_kitch", (req, res) => {
  const kitchId = req.params.Id_kitch;
  kitchenService
    .deleteKitchenById(kitchId)
    .then((result) => {
      console.log("cuisine supprimée :", kitchId);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error" + err.sqlMessage });
    });
});

module.exports = router;
