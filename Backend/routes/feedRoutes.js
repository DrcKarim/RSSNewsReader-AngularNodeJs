/*const express = require('express');
const router = express.Router();
const {
    getFeed,
    getAllFeeds,
    getFeedItemsByFeedId,
    updateFeed,
    deleteFeed,
    refreshFeed
} = require('../controllers/feedController');
const authenticateToken = require('../middleware/authMiddleware');

// ✅ Apply token verification here
router.get('/', authenticateToken, getAllFeeds);                     // GET /api/feeds
router.post('/', authenticateToken, getFeed);                        // POST /api/feeds

router.get('/:id/items', authenticateToken, getFeedItemsByFeedId);  // GET items
router.patch('/:id', authenticateToken, updateFeed);                // PATCH
router.delete('/:id', authenticateToken, deleteFeed);               // DELETE
router.post('/feeds/:id/refresh', authenticateToken, refreshFeed);  // REFRESH

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const { getFeed, getAllFeeds, getFeedItemsByFeedId, updateFeed, deleteFeed, refreshFeed } = require('../controllers/feedController');
const auth = require('../middleware/authMiddleware');
const feedController = require('../controllers/feedController');
const authenticateToken = require('../middleware/authMiddleware');


router.get('/', getAllFeeds);   // GET /api/feeds
router.get('/:id/items', getFeedItemsByFeedId);  // List items for a feed
router.post('/', getFeed); // Envoie un URL RSS et reçoit les articles
router.patch('/:id', updateFeed);     //  PATCH route
router.delete('/:id', deleteFeed);    //   DELETE route
router.post('/feeds/:id/refresh', refreshFeed);

//router.get('/', auth, feedController.getAllFeeds);
//router.post('/', auth, feedController.getFeed);
//router.get('/', authenticateToken, feedController.getAllFeeds);

//router.get('/', authenticateToken, feedController.getAllFeeds);
//router.post('/', authenticateToken, feedController.getFeed);


module.exports = router;