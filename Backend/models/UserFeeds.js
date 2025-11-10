const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Feed = require('./Feed');

const UserFeed = sequelize.define('UserFeed', {
  subscribedAt: DataTypes.DATE
});

UserFeed.belongsTo(User);
UserFeed.belongsTo(Feed);
User.hasMany(UserFeed);
Feed.hasMany(UserFeed);

module.exports = UserFeed;