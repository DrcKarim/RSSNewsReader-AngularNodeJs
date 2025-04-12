const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Feed = require('./Feed');

const FeedItem = sequelize.define('FeedItem', {
  title: DataTypes.STRING,
  link: DataTypes.STRING,
  description: DataTypes.TEXT,
  pubDate: DataTypes.DATE,
  guid: { type: DataTypes.STRING, unique: true }
});

FeedItem.belongsTo(Feed);
Feed.hasMany(FeedItem);

module.exports = FeedItem;