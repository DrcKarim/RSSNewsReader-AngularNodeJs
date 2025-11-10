const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const FeedItem = require('./FeedItem');

const Recommendation = sequelize.define('Recommendation', {
  reason: DataTypes.STRING
});

Recommendation.belongsTo(User);
Recommendation.belongsTo(FeedItem);

User.hasMany(Recommendation);
FeedItem.hasMany(Recommendation);

module.exports = Recommendation;