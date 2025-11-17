const express = require('express');
const router = express.Router();
const { getFeed, getAllFeeds, getFeedItemsByFeedId, updateFeed, deleteFeed, refreshFeed, getRecommendations, getSmartRecommendations, getAIRecommendations, getByCategory } = require('../controllers/feedController');

router.get('/', getAllFeeds);   // GET /api/feeds
router.get('/:id/items', getFeedItemsByFeedId);  // List items for a feed
router.post('/', getFeed); // Envoie un URL RSS et reçoit les articles
router.patch('/:id', updateFeed);     //  PATCH route
router.delete('/:id', deleteFeed);    //   DELETE route
router.post('/feeds/:id/refresh', refreshFeed); // Refresh Route
//router.get('/recommendations', getRecommendations);
router.post('/recommendations', getRecommendations);
router.post('/smart-recommendations', getSmartRecommendations);
router.post('/ai-recommendations', getAIRecommendations);
router.get('/category/:name',  getByCategory);


module.exports = router;