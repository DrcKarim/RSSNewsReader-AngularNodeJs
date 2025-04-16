const Parser = require('rss-parser');
const { Feed, FeedItem } = require('../models');

const parser = new Parser();

async function parseFeedById(id) {
    const feed = await Feed.findByPk(id);
    if (!feed) throw new Error('Feed not found');

    const parsed = await parser.parseURL(feed.url);

    // Clear old items and save new ones (optional, based on your strategy)
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