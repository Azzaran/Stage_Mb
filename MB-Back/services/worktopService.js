const conn = require("./database");

const fetchWorktop = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_wk, Name_wk, Image_wk, Type_wk FROM worktop ORDER BY Name_wk`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const fetchWorktopByID = (IdWorktop) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_wk, Name_wk, Image_wk, Type_wk  FROM worktop WHERE Id_wk = ?`;
    let query = conn.query(sql, [IdWorktop], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addWorktop = (worktop) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO worktop(Name_wk, Image_wk, Type_wk) VALUES (?, ?, ?)`;
    let query = conn.query(
      sql,
      [worktop.Name_wk, worktop.Image_wk, worktop.Type_wk],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const modifWorktop = (worktop) => {
  return new Promise((resolve, reject) => {
    const Id_wk = worktop.Id_wk;
    if (Id_wk === undefined) {
      return reject("L'ID du plan de travail n'est pas défini.");
    }
    let sql = `UPDATE worktop SET 
        Name_wk= ?,
        Image_wk=?,
        Type_wk =?
        WHERE Id_wk = ?;`;

    conn.query(
      sql,
      [worktop.Name_wk, worktop.Image_wk, worktop.Type_wk, Id_wk],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
        console.log(sql);
      }
    );
  });
};

const deleteWorktopById = (wkId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM worktop WHERE worktop.Id_wk = ?;`;
    let query = conn.query(sql, [wkId], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  fetchWorktop,
  addWorktop,
  modifWorktop,
  deleteWorktopById,
  fetchWorktopByID,
};
