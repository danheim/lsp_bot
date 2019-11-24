const config = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "51.38.127.130",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.DB_NAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "51.38.127.130",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DB_NAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "51.38.127.130",
    "dialect": "mysql",
    "operatorsAliases": false
  }
};

module.exports = config;
