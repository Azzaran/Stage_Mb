const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const SECRET = "XZrpIk2IHuERhdSF0zM9";
const kitchen = require("./modules/kitchen");
const worktop = require("./modules/worktop");
const gallery = require("./modules/gallery");
const admin = require("./modules/admin");
const profile = require("./modules/profile");
const adminService = require("./services/adminService");
const door = require("./modules/door");
const accessories = require("./modules/accessories");
const handle = require("./modules/handle");
const bcrypt = require("bcrypt");
const allowedOrigins = ["http://localhost:3001", "http://127.0.0.1:3001"];
const port = 3000;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../MB-Front/public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.json()); /*Toujours en Haut*/

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.post("/upload", upload.single("Image_gallery"), (req, res) => {
  res.json(req.file);
});
app.post("/uploadkitchimg", upload.single("Image_kitch"), (req, res) => {
  res.json(req.file);
});
app.post("/uploadkitchpdf", upload.single("Pdf_kitch"), (req, res) => {
  res.json(req.file);
});
app.post("/uploaddoor", upload.single("Image_door"), (req, res) => {
  res.json(req.file);
});
app.post("/uploadhandle", upload.single("Image_hand"), (req, res) => {
  res.json(req.file);
});
app.post("/uploadworktop", upload.single("Image_wk"), (req, res) => {
  res.json(req.file);
});
app.post("/uploadacc", upload.single("Image_acc"), (req, res) => {
  res.json(req.file);
});

/*Partie Token*/
/* Récupération du header bearer */
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
  // Récupération du token
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Présence d'un token
  if (!token) {
    return res.status(401).json({ message: "Token inexistant" });
  }
  // Véracité du token
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error. Mauvais token" });
    } else {
      return next();
    }
  });
};

app.get("/", checkTokenMiddleware, (req, res) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Décodage du token
  const decoded = jwt.decode(token, { complete: false });

  if (decoded != null && decoded != undefined) {
    res.send("Hello World!");
  } else {
  }
});

/*Fin partie token*/

/*Route permettant la connexion*/
app.post("/connexion", (req, res) => {
  if (!req.body.MailConn_admin && !req.body.PwdConn_admin) {
    return res
      .status(400)
      .json({ message: "Error. Please enter the correct login and password" });
  }
  // Checking
  adminService
    .connAdmin(req.body)
    .then((result) => {
      bcrypt.compare(
        req.body.PwdConn_admin,
        result[0].Pwd_admin,
        (err, resultCompare) => {
          if (resultCompare === true) {
            const token = jwt.sign(
              {
                user: result[0],
              },
              SECRET,
              { expiresIn: "3 hours" }
            );
            res.status(200);
            res.json({ access_token: token, user: result[0] });
          } else {
            res.status(401);
            res.json({ messsage: "Invalid credentials" });
          }
        }
      );
    })
    .catch((err) => {
      console.error(err);
    });
});

app.use ("admin", admin);
app.use("/kitchen", kitchen);
app.use("/worktop", worktop);
app.use("/gallery", gallery);
app.use("/door", door);
app.use("/accessories", accessories);
app.use("/handle", handle);
app.use("/profil", profile);

app.listen(port, () => {
  console.log(
    `Application exemple à l'écoute sur le port http://127.0.0.1:${port}/ !`
  );
  // console.log(`Route cuisine : http://127.0.0.1:${port}/kitchen !`);
});
