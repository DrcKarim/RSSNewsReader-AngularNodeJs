const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feed = sequelize.define('Feed', {
  url: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  lastFetched: DataTypes.DATE,
});

module.exports = Feed;