const express = require("express");
const profileService = require("../services/profileService");
const router = express.Router();



router.get("/", (req, res) => {
  profileService
    .fetchProfile()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.patch("/", (req, res) => {
    const modifyProfile = req.body;
    profileService.modifyProfile(modifyProfile).then(result => {
        console.log(result);
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

module.exports = router;
