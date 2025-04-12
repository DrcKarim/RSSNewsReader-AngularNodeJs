const sequelize = require('../config/database');
const Feed = require('./Feed');
const FeedItem = require('./FeedItem');

module.exports = {
  sequelize,
  Feed,
  FeedItem
};