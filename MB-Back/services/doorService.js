const conn = require("./database");

const fetchDoor = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_door, Name_door, Image_door, Height_door, Width_door, Descr_door FROM door ORDER BY Name_door `;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const fetchDoorById = (IdDoor) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_door, Name_door, Image_door, Height_door, Width_door, Descr_door FROM door WHERE Id_door = ?`;
    let query = conn.query(sql,[IdDoor] ,(err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addDoor = (door) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO door(Name_door, Image_door, Height_door, Width_door, Descr_door) VALUES (?, ?, ?, ?, ?)`;
    let query = conn.query(
      sql,
      [
        door.Name_door,
        door.Image_door,
        door.Height_door,
        door.Width_door,
        door.Descr_door,
      ],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const modifDoor = (door) => {
  return new Promise((resolve, reject) => {
    const Id_door = door.Id_door;
    if (Id_door === undefined) {
      return reject("L'ID de la porte n'est pas défini.");
    }
    let sql = `UPDATE door SET 
      Name_door= ?,
      Image_door=?,
      Height_door =?,
      Width_door=?,
      Descr_door=?
      WHERE Id_door = ?;`;

    conn.query(
      sql,
      [
        door.Name_door,
        door.Image_door,
        door.Height_door,
        door.Width_door,
        door.Descr_door,
        Id_door,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
        console.log(sql);
      }
    );
  });
};

const deleteDoorById = (doorId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM door WHERE door.Id_door = ?;`;
    let query = conn.query(sql, [doorId], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


module.exports = {
  fetchDoor,
  addDoor,
  modifDoor,
  deleteDoorById,
  fetchDoorById
};
