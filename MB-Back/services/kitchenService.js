const conn = require("./database");

const fetchKitchen = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_kitch, Name_kitch, Image_kitch, Matiere, Epaisseur, Finition, Aspect, Pdf_kitch FROM kitchen ORDER BY Name_kitch`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const fetchKitchByID = (IdKitch) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_kitch, Name_kitch, Image_kitch, Matiere, Epaisseur, Finition, Aspect, Pdf_kitch  FROM kitchen WHERE Id_kitch = ?`;
    let query = conn.query(sql, [IdKitch], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const fetchFiveImgKitch = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Image_kitch FROM kitchen Limit 5`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addKitchen = (kitchen) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO kitchen(Name_kitch, Image_kitch, Matiere, Epaisseur, Finition, Aspect, Pdf_kitch ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let query = conn.query(
      sql,
      [kitchen.Name_kitch, kitchen.Image_kitch, kitchen.Matiere, kitchen.Epaisseur, kitchen.Finition, kitchen.Aspect, kitchen.Pdf_kitch],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const modifKitchen = (kitchen) => {
  return new Promise((resolve, reject) => {
    const Id_kitch = kitchen.Id_kitch;
    if (Id_kitch === undefined) {
      return reject("L'ID de la cuisine n'est pas défini.");
    }
    let sql = `UPDATE kitchen SET 
      Name_kitch= ?,
      Image_kitch=?,
      Matiere= ?, 
      Epaisseur= ?, 
      Finition= ?, 
      Aspect= ?,
      Pdf_kitch=?
      WHERE Id_kitch = ?;`;

    conn.query(
      sql,
      [
        kitchen.Name_kitch,
        kitchen.Image_kitch,
        kitchen.Matiere,
        kitchen.Epaisseur,
        kitchen.Finition,
        kitchen.Aspect,
        kitchen.Pdf_kitch,
        Id_kitch,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
        console.log(sql);
      }
    );
  });
};

const deleteKitchenById = (kitchId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM kitchen WHERE kitchen.Id_kitch = ?;`;
    let query = conn.query(sql, [kitchId], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  fetchKitchen,
  fetchKitchByID,
  addKitchen,
  modifKitchen,
  deleteKitchenById,
  fetchFiveImgKitch,
};
