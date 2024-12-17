const { Sequelize } = require("sequelize");
require("dotenv/config");

const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? process.env.DB_NAME
    : process.env.PGDATABASE, // Gunakan PGDATABASE untuk produksi
  process.env.NODE_ENV === "development"
    ? process.env.DB_USER
    : process.env.PGUSER, // Gunakan PGUSER untuk produksi
  process.env.NODE_ENV === "development"
    ? process.env.DB_PASSWORD
    : process.env.PGPASSWORD, // Gunakan PGPASSWORD untuk produksi
  {
    host: 
      process.env.NODE_ENV === "development"
        ? process.env.DB_HOST
        : process.env.PGHOST,  // Gunakan PGHOST untuk produksi (alamat host NeonDB)
    port: process.env.DB_PORT || 5432, // Pastikan port yang benar
    dialect: process.env.DB_DIALECT || "postgres", // Dialek yang digunakan
    logging:
      process.env.NODE_ENV !== "production"
        ? (...msg) => console.log(msg)
        : false,
    dialectOptions: {
      requestTimeout: 30000,
      encrypt: true,  // Jika perlu, aktifkan enkripsi untuk NeonDB atau penyedia lain
      ssl: {
        require: true,  // Menggunakan SSL jika perlu
        rejectUnauthorized: false,  // Untuk menghindari masalah sertifikat
      },
    },
  }
);

module.exports = sequelize;
