const conn = require("./database");

const fetchHandle = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_hand, Name_hand, Dimension_hand, Image_hand, Material_hand FROM handle ORDER BY Name_hand `;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const fetchHandleByID = (IdHandle) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_hand, Name_hand, Image_hand, Dimension_hand, Material_hand  FROM handle WHERE Id_hand = ? ; `;
    let query = conn.query(sql, [IdHandle], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addhandle = (handle) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO handle(Name_hand, Image_hand, Dimension_hand, Material_hand) VALUES (?, ?, ?, ?)`;
    let query = conn.query(
      sql,
      [
        handle.Name_hand,
        handle.Image_hand,
        handle.Dimension_hand,
        handle.Material_hand,
      ],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const modifHandle = (handle) => {
  return new Promise((resolve, reject) => {
    const Id_hand = handle.Id_hand;
    if (Id_hand === undefined) {
      return reject("L'ID de la poignée n'est pas défini.");
    }
    let sql = `UPDATE handle SET 
      Name_hand= ?,
      Dimension_hand=?,
      Image_hand =?,
      Material_hand=?
      WHERE Id_hand = ?;`;

    conn.query(
      sql,
      [
        handle.Name_hand,
        handle.Dimension_hand,
        handle.Image_hand,
        handle.Material_hand,
        Id_hand,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
        console.log(sql);
      }
    );
  });
};

const deleteHandleById = (handId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM handle WHERE handle.Id_hand = ?;`;
    let query = conn.query(sql, [handId], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  fetchHandle,
  addhandle,
  modifHandle,
  deleteHandleById,
  fetchHandleByID
};
