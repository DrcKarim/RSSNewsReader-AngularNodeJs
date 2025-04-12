const { parseRSS } = require('../services/rssService');
const { Feed, FeedItem } = require('../models');

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

module.exports = {
  getFeed,
  getAllFeeds,
  getFeedItemsByFeedId,
    updateFeed,
  deleteFeed
};