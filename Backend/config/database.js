const { Sequelize } = require('sequelize');
require('dotenv').config();

/*This code sets up a connection to a PostgreSQL database using Sequelize, an ORM (Object-Relational Mapping)
for Node.js. It reads the database configuration (name, user, password, host)
from environment variables and creates a reusable Sequelize instance,
which is then exported for use throughout the backend */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;