import  dotenv from 'dotenv';
dotenv.config();
import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    // connection: 'postgres://cotljglr:mdv4VyhAuebIgpvGXC3_SzQD79R3VqSI@kashin.db.elephantsql.com/cotljglr',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      directory: './src/db/migrations',
    },
    seeds: {
      extension: 'ts',
      directory: './src/db/seeds',
    },
  },
};

// module.exports = config;
export default config;
