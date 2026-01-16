require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_Name || "node_backend",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_Name,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  },
};
