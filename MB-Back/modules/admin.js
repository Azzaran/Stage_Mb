const express = require("express");
const adminService = require("../services/adminService");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  adminService
    .fetchAdmin()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.get("/admin", (req, res) => {
  let data = req.body;
  adminService
    .connAdmin(data)
    .then((result) => {
      console.log(result);
      bcrypt.compare(
        data.PwdConn_admin /*formulaire*/,
        result[0].PwdConn_admin /*BDD*/,
        function (err, resultCompare) {
          if (result === true) {
            res.status(200);
            res.json(result[0]);
          } else {
            res.status(401);
            res.json({ message: "erreur de mot de passe" });
            return;
          }
        }
      );
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.post("/", (req, res) => {
  //hash du mdp//
  let data = req.body;
  try {
    bcrypt.hash(data.Pwd_admin, 5, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "erreur lors du cryptage du mdp." });
        return;
      }
      data.Pwd_admin = hash;
      adminService.addAdmin(data).then((result) => {
        res.status(201);
        res.json(data);
      });
    });
  } catch (error) {
    console.log(err);
    res.send({ message: "Votre ajout ne s'est pas bien passé" });
  }
});


module.exports = router;
