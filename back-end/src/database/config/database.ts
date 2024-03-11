import { Sequelize } from 'sequelize';
import dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize({
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '1234',
  database: process.env.PGDATABASE || 'database_development',
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
});

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

syncDatabase();

export default sequelize;
