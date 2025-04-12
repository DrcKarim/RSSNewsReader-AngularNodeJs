const express = require('express');
const cors = require('cors');
const feedRoutes = require('./routes/feedRoutes');
const { sequelize } = require('./models');
const { createDatabaseIfNotExists } = require('./utils/initDB');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/feeds', feedRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  await createDatabaseIfNotExists();

  sequelize.sync({ alter: true })
    .then(() => {
      console.log('✅ Sequelize models synced');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ Sequelize sync error:', err);
    });
})();