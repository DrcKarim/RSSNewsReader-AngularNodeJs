const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Feed = require('./Feed');
/*
This code defines the FeedItem model, which represents individual articles or entries from an RSS feed.
Each item includes a title, link, description, publication date, and a unique guid. The model establishes
a relationship where each FeedItem belongs to a Feed,
and each Feed can have many FeedItems, enabling the app
to link feed items to their corresponding source feed in the database.
*/

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