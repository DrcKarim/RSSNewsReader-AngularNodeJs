const Parser = require('rss-parser');
const parser = new Parser();

const parseRSS = async (url) => {
  const feed = await parser.parseURL(url);
  return {
    title: feed.title,
    description: feed.description,
    items: feed.items
  };
};

module.exports = { parseRSS };