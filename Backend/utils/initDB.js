const { Client } = require('pg');
require('dotenv').config();

const createDatabaseIfNotExists = async () => {
  const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: 'postgres', // connect to default DB to check/create your target DB
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database "${DB_NAME}" created.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }
  } catch (err) {
    console.error('❌ Failed to create/check database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
};

module.exports = { createDatabaseIfNotExists };