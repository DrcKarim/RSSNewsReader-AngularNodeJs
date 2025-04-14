const Parser = require('rss-parser');
const { Feed, FeedItem } = require('../models');

const parser = new Parser();

/*
The parseFeedById function re-fetches and updates the content of a specific RSS feed by its database ID.
It looks up the feed, parses the latest data from its URL using rss-parser, deletes its old items,
and saves the newly fetched ones. This function is useful for refreshing
a feed’s content on demand and is exported for use in routes like refreshFeed.
*/
async function parseFeedById(id) {
    const feed = await Feed.findByPk(id);
    if (!feed) throw new Error('Feed not found');

    const parsed = await parser.parseURL(feed.url);

    // Clear old items and save new ones
    await FeedItem.destroy({ where: { FeedId: id } });

    const items = parsed.items.map(item => ({
        FeedId: id,
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.contentSnippet || item.content || '',
    }));

    await FeedItem.bulkCreate(items);

    return feed;
}

module.exports = { parseFeedById };