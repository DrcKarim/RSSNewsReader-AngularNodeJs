const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserFeed = sequelize.define("UserFeed", {});

module.exports = UserFeed;

