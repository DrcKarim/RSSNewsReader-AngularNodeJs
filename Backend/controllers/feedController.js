const { parseRSS } = require('../services/rssService');
const { Feed, FeedItem } = require('../models');
const { parseFeedById } = require('../utils/feedParser');


/*
The getFeed function receives an RSS feed URL, checks if it's already in the database, and if not, it parses the feed,
stores its metadata and items, and then returns the feed and its items sorted by date. This allows the backend
to dynamically process and store new feeds when a user adds them.
*/
const getFeed = async (req, res) => {
  const { url } = req.body;
  try {
    let feed = await Feed.findOne({ where: { url } });
    if (!feed) {
      const parsed = await parseRSS(url);
      if (!parsed?.items || parsed.items.length === 0) {
        return res.status(400).json({ message: 'Invalid or unsupported RSS feed URL' });
      }
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
    console.error(error.message);
    if (error.message.includes('Failed to parse RSS feed')) {
      return res.status(400).json({ message: 'Invalid RSS feed' });
    }
    res.status(500).json({ message: 'Error fetching and saving feed' });
  }
};

/*
The getAllFeeds function handles a GET request to retrieve all RSS feeds stored in the database.
It fetches all feeds from the Feed table, orders them by creation date (newest first),
and returns them as a JSON response. If an error occurs during the process,
it logs the error and returns a 500 error response.
*/
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

/*
The getFeedItemsByFeedId function handles a GET request for a specific RSS feed's items based on its ID.
It first checks if the feed exists in the database using the provided ID, and if found,
it retrieves all associated feed items ordered by publication date (newest first).
If the feed doesn't exist or an error occurs, it responds with an appropriate error message.
*/
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

/*
The updateFeed function handles a PATCH request to update an existing RSS feed. It looks up the feed by ID, and if found,
updates its title and description using values from the request body. On success, it returns the updated feed;
otherwise, it responds with a not found or error message.
*/
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

/*
The deleteFeed function handles a DELETE request to remove an RSS feed by its ID.
It first checks if the feed exists, deletes all related feed items,
then deletes the feed itself. If successful, it returns a confirmation message;
otherwise, it handles errors with proper responses.
 */
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

/*
The refreshFeed function handles a request to manually refresh an RSS feed by its ID. It calls the parseFeedById
function (custom logic that re-fetches and parses the latest feed items from the source URL),
then returns the updated feed data. If something goes wrong,
it logs the error and responds with a 500 error message.
*/
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
  refreshFeed
};