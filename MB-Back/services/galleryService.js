const conn = require("./database");

const fetchGallery = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Id_gallery, Name_gallery, Image_gallery FROM gallery ORDER BY Name_gallery`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const fetchGalleryTrust = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT Name_gallery, Image_gallery FROM gallery 
    WHERE Id_gallery = 2 
    OR Id_gallery = 7 
    OR Id_gallery = 11 
    OR Id_gallery = 14
    OR Id_gallery = 18 
    OR Id_gallery = 19 `;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addGallery = (gallery) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO gallery(Name_gallery, Image_gallery) VALUES (?, ?)`;
    let query = conn.query(
      sql,
      [gallery.Name_gallery, gallery.Image_gallery],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};


const deleteGalleryById = (galleryId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM gallery WHERE gallery.Id_gallery = ?;`;
    let query = conn.query(sql, [galleryId], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  fetchGallery,
  addGallery,
  deleteGalleryById,
  fetchGalleryTrust
};
