const conn = require("./database");

const fetchAccessories = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_acc, Name_acc, Image_acc FROM accessories ORDER BY Name_acc`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const fetchAccessoriesByID = (IdAcc) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_acc, Name_acc, Image_acc FROM accessories WHERE Id_acc = ?;`;
    let query = conn.query(sql, [IdAcc], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addAccessories = (accessories) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO accessories(Name_acc, Image_acc) VALUES (?, ?)`;
    let query = conn.query(
      sql,
      [accessories.Name_acc, accessories.Image_acc],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const modifAccessories = (accessories) => {
  return new Promise((resolve, reject) => {
    const Id_acc = accessories.Id_acc;
    if (Id_acc === undefined) {
      return reject("L'ID de la cuisine n'est pas défini.");
    }
    let sql = `UPDATE accessories SET 
      Name_acc= ?,
      Image_acc=?
      WHERE Id_acc = ?;`;

    conn.query(
      sql,
      [accessories.Name_acc, accessories.Image_acc, Id_acc],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
        console.log(sql);
      }
    );
  });
};

const deleteAccessoriesById = (accId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM accessories WHERE accessories.Id_acc = ?;`;
    let query = conn.query(sql, [accId], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
module.exports = {
  fetchAccessories,
  addAccessories,
  modifAccessories,
  deleteAccessoriesById,
  fetchAccessoriesByID,
};
