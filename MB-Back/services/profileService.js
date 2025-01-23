const conn = require("./database");

const fetchProfile = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT ID_profile, Name_profile, Phone_French, Phone_Belgian, Address, Email FROM profile`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const modifyProfile = (profil) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE profile SET Name_profile = ?, 
      Phone_French = ?, Phone_Belgian = ? ,
      Address = ?, Email = ?
          WHERE ID_profile= ?`;
    let query = conn.query(
      sql,
      [
        profil.Name_profile,
        profil.Phone_French,
        profil.Phone_Belgian,
        profil.Address,
        profil.Email,
        profil.ID_profile,
      ],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  fetchProfile,
  modifyProfile,
};
