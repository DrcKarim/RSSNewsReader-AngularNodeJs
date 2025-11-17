const Parser = require('rss-parser');
const parser = new Parser();
const Feed = require('../models/Feed');
const FeedItem = require('../models/FeedItem');
const categoryKeywords = require('../config/categoryKeywords.json');  // ✅ CHARGEMENT JSON

// -------------------------------------------------------------
// 🔥 Fonction de détection de catégorie
// -------------------------------------------------------------
function detectCategory(title) {
  console.log("🔥🔥🔥 detectCategory CALLED with title:", title);

  title = title?.toLowerCase() || "";

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(word => title.includes(word))) {
      console.log(`✔ CATEGORY FOUND: ${category} for title: ${title}`);
      return category;
    }
  }

  console.log("❌ NO CATEGORY FOUND for title:", title);
  return "Général";
}

// -------------------------------------------------------------
// 🔥 PARSE FEED BY ID
// -------------------------------------------------------------
async function parseFeedById(id) {
  const feed = await Feed.findByPk(id);
  if (!feed) throw new Error("Feed not found");

  const parsed = await parser.parseURL(feed.url);
  console.log("📌 parsed.items length:", parsed.items.length);
  // Supprimer les anciens items
  await FeedItem.destroy({ where: { FeedId: id } });

  // Générer les nouveaux items
  const itemsToCreate = parsed.items.map(item => ({
    FeedId: id,
    title: item.title || null,
    link: item.link || null,
    pubDate: item.pubDate || null,
    description: item.contentSnippet || item.content || null,
    guid: item.guid || item.link,

    // 🟦 CATEGORIE AUTOMATIQUE
    category: detectCategory(item.title || "")
  }));

  // Insérer en base
  await FeedItem.bulkCreate(itemsToCreate);

  return { feed, items: itemsToCreate };
}

module.exports = { parseFeedById };
