import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('blobs',(table) => {
        table.increments('blob_id').primary();
        table.jsonb('blob_data').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('blobs');
}

