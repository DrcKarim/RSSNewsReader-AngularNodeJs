const express = require('express');
const router = express.Router();
const { getFeed, getAllFeeds, getFeedItemsByFeedId, updateFeed, deleteFeed } = require('../controllers/feedController');

router.get('/', getAllFeeds);   // GET /api/feeds
router.get('/:id/items', getFeedItemsByFeedId);  // List items for a feed
router.post('/', getFeed); // Envoie un URL RSS et reçoit les articles
router.patch('/:id', updateFeed);     //  PATCH route
router.delete('/:id', deleteFeed);    //   DELETE route

module.exports = router;