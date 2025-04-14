const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/*
This code defines the Feed model using Sequelize to represent RSS feed metadata in the database. Each feed has a unique URL,
a title, a description, and a timestamp (lastFetched) for when it was last updated.
The model is linked to your PostgreSQL database through
the Sequelize instance and is exported for use in other parts of the application.
*/

const Feed = sequelize.define('Feed', {
  url: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  lastFetched: DataTypes.DATE,
});

module.exports = Feed;