require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "u949956213_node_backend",
    password: process.env.DB_PASS || "Alp01011997@",
    database: process.env.DB_Name || "u949956213_node_backend",
    host: process.env.DB_HOST || "srv1958.hstgr.io",
    dialect: "mysql",
    logging: false
  },
    username: process.env.DB_USER || "u949956213_node_backend",
    password: process.env.DB_PASS || "Alp01011997@",
    database: process.env.DB_Name || "u949956213_node_backend",
    host: process.env.DB_HOST || "srv1958.hstgr.io",
    dialect: "mysql",
    logging: false
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
