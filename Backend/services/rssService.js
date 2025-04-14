const Parser = require('rss-parser');
const parser = new Parser();

/*
helper function parseRSS that uses the rss-parser library to fetch and parse an RSS feed from a given URL.
It extracts the feed’s title, description, and list of items (articles),
then returns them in a structured format.
This function is exported for use in routes or services that need to process RSS feeds.
*/
const parseRSS = async (url) => {
  try {
    const feed = await parser.parseURL(url);
    return {
      title: feed.title,
      description: feed.description,
      items: feed.items
    };
  } catch (err) {
    console.error('RSS parse error:', err.message);
    throw new Error('Failed to parse RSS feed');
  }
};

module.exports = { parseRSS };