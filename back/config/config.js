const dotenv=require('dotenv');
dotenv.config();

module.exports={
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "badal",
    "host": process.env.DB_ADDRESS,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "badal",
    "host": process.env.DB_ADDRESS,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "badal",
    "host": process.env.DB_ADDRESS,
    "dialect": "mysql"
  }
}
