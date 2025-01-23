const conn = require("./database");

const addAdmin = (admin) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO admins (Pwd_admin, Mail_admin) VALUES (?, ?)`;
    let query = conn.query(
      sql,
      [admin.Pwd_admin, admin.Mail_admin],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const fetchAdmin = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Mail_admin, Pwd_admin FROM admins`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const connAdmin = (admin) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_admin, Pwd_admin, Mail_admin
      FROM admins WHERE Mail_admin = ? `;
    let query = conn.query(sql, [admin.MailConn_admin], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  fetchAdmin,
  connAdmin,
  addAdmin
};
