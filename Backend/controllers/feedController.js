const { parseRSS } = require('../services/rssService');
const { Feed, FeedItem,UserFeed  } = require('../models');
const { parseFeedById } = require('../utils/feedParser');


//========================================Old configuration without user =======================
// POST /api/feeds
const getFeed = async (req, res) => {
  const { url } = req.body;
  try {
    let feed = await Feed.findOne({ where: { url } });

    if (!feed) {
      const parsed = await parseRSS(url);
      feed = await Feed.create({
        url,
        title: parsed.title,
        description: parsed.description,
        lastFetched: new Date()
      });

      const feedItems = parsed.items.map(item => ({
        title: item.title,
        link: item.link,
        description: item.contentSnippet || item.content,
        pubDate: item.pubDate,
        guid: item.guid || item.link,
        FeedId: feed.id
      }));

      await FeedItem.bulkCreate(feedItems, {
        ignoreDuplicates: true
      });
    }

    const items = await FeedItem.findAll({
      where: { FeedId: feed.id },
      order: [['pubDate', 'DESC']]
    });

    res.json({ feed, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching and saving feed' });
  }
};

// GET /api/feeds
 const getAllFeeds = async (req, res) => {
  try {
    const feeds = await Feed.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(feeds);
  } catch (error) {
    console.error('Error fetching feeds:', error);
    res.status(500).json({ message: 'Failed to fetch feeds' });
  }
};
//========================================Old configuration without user =======================

/*
const getFeed = async (req, res) => {
  const { url } = req.body;
  const userId = req.user.id;

  try {
    // Check if feed already exists
    let feed = await Feed.findOne({ where: { url } });

    if (!feed) {
      // Parse the feed
      const parsed = await parseRSS(url);

      // Create new feed entry
      feed = await Feed.create({
        url,
        title: parsed.title,
        description: parsed.description,
        lastFetched: new Date(),
        UserId: req.user.id
      });

      // Save feed items
      const feedItems = parsed.items.map(item => ({
        title: item.title,
        link: item.link,
        description: item.contentSnippet || item.content,
        pubDate: item.pubDate,
        guid: item.guid || item.link,
        FeedId: feed.id
      }));

      await FeedItem.bulkCreate(feedItems, {
        ignoreDuplicates: true
      });
    }

    // 📌 Associate the feed with the current user (if not already)
    const alreadyLinked = await UserFeed.findOne({
      where: { UserId: userId, FeedId: feed.id }
    });

    if (!alreadyLinked) {
      await UserFeed.create({ UserId: userId, FeedId: feed.id });
    }

    // Return items
    const items = await FeedItem.findAll({
      where: { FeedId: feed.id },
      order: [['pubDate', 'DESC']]
    });

    res.json({ feed, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching and saving feed' });
  }
};


const getAllFeeds = async (req, res) => {
  try {
    console.log("User from token:", req.user);
    const feeds = await Feed.findAll({
      include: [{
        association: 'Users',
        where: { id: req.user.id },
        attributes: [], // we only want Feed data
        through: { attributes: [] } // hide join table data
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(feeds);
  } catch (error) {
    console.error('Error fetching user feeds:', error);
    res.status(500).json({ message: 'Failed to fetch feeds' });
  }
};  */
//======================================New conf above =============================
// GET /api/feeds/id
const getFeedItemsByFeedId = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if feed exists
    const feed = await Feed.findByPk(id);
    if (!feed) {
      return res.status(404).json({ message: 'Feed not found' });
    }

    // Get all items for this feed
    const items = await FeedItem.findAll({
      where: { FeedId: id },
      order: [['pubDate', 'DESC']]
    });

    res.json({ feed, items });
  } catch (error) {
    console.error('Error fetching feed items:', error);
    res.status(500).json({ message: 'Failed to fetch feed items' });
  }
};

//PATCH update feed
const updateFeed = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const feed = await Feed.findByPk(id);
    if (!feed) {
      return res.status(404).json({ message: 'Feed not found' });
    }

    await feed.update({ title, description });
    res.json({ message: 'Feed updated', feed });
  } catch (error) {
    console.error('Error updating feed:', error);
    res.status(500).json({ message: 'Failed to update feed' });
  }
};

//DeleteFeed 
const deleteFeed = async (req, res) => {
  const { id } = req.params;

  try {
    const feed = await Feed.findByPk(id);
    if (!feed) {
      return res.status(404).json({ message: 'Feed not found' });
    }

    // Delete associated items first
    await FeedItem.destroy({ where: { FeedId: id } });

    // Then delete the feed itself
    await feed.destroy();

    res.json({ message: 'Feed deleted' });
  } catch (error) {
    console.error('Error deleting feed:', error);
    res.status(500).json({ message: 'Failed to delete feed' });
  }
};

const refreshFeed = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFeed = await parseFeedById(id); // your logic to refetch items
    res.json(updatedFeed);
  } catch (err) {
    console.error('Error in refreshFeed:', err);
    res.status(500).json({ error: 'Failed to refresh feed' });
  }
};




module.exports = {
  getFeed,
  getAllFeeds,
  getFeedItemsByFeedId,
    updateFeed,
  deleteFeed,
  refreshFeed,
};