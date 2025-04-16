const sequelize = require('../config/database');

const Feed = require('./Feed');
const FeedItem = require('./FeedItem');
const User = require('./User');
const UserFeed = require('./UserFeed');

// Setup associations
User.belongsToMany(Feed, { through: UserFeed });
Feed.belongsToMany(User, { through: UserFeed });
User.hasMany(Feed);
Feed.belongsTo(User);


module.exports = {
  sequelize,
  Feed,
  FeedItem,
  User,
  UserFeed
};