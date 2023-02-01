import Knex from "knex";
import knexFile from '../../knexfile';

const environment = process.env.NODE_ENV || "development";
const config = knexFile[environment];
const db = Knex(config);


export default db;