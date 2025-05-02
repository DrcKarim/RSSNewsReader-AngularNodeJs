const express = require('express');
const cors = require('cors');
const feedRoutes = require('./routes/feedRoutes');
const { sequelize } = require('./models');
const { createDatabaseIfNotExists } = require('./utils/initDB');
require('dotenv').config();

/*
This is the main server file for the backend. It sets up an Express app with CORS and JSON parsing,
mounts feed-related routes under /api/feeds, ensures the database exists, and then synchronizes Sequelize models.
Once everything is ready, it starts the server on the specified port.
This setup ensures the app is fully prepared before serving any requests.
*/

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/feeds', feedRoutes);
app.use('/api', feedRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  await createDatabaseIfNotExists();

  sequelize.sync({ alter: true })
    .then(() => {
      console.log('==> Sequelize models synced <==');
      app.listen(PORT, () => {
        console.log(`==> Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('==> X Sequelize sync error:', err);
    });
})();