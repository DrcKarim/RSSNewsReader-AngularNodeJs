const sequelize = require('../config/database');
const Feed = require('./Feed');
const FeedItem = require('./FeedItem');
/*
The index serves as a central export module for the database models and the Sequelize instance.
It imports the sequelize connection and the defined models (Feed and FeedItem),
then exports them together. This allows other parts of the app
like controllers or services to easily import everything from one place.
*/
module.exports = {
  sequelize,
  Feed,
  FeedItem
};