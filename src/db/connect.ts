import { knex } from "knex";
import knexFile from '../../knexfile';

const environment = process.env.NODE_ENV || "development";
const config = knexFile[environment];
const db = knex(config);


export default db;