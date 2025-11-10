const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const FeedItem = require('./FeedItem');

const UserArticle = sequelize.define('UserArticle', {
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
  isLiked: { type: DataTypes.BOOLEAN, defaultValue: false },
  isBookmarked: { type: DataTypes.BOOLEAN, defaultValue: false },
  readAt: DataTypes.DATE
});

UserArticle.belongsTo(User);
UserArticle.belongsTo(FeedItem);
User.hasMany(UserArticle);
FeedItem.hasMany(UserArticle);

module.exports = UserArticle;