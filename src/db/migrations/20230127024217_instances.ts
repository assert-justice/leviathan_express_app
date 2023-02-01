import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('instances', (table) => {
        table.increments('instance_id').primary();
        table.integer('location_id');
    });
}

export async function down(knex: Knex): Promise<void> {
    // return knex.schema.dropTable('instances');
    return knex.raw('TRUNCATE instances RESTART IDENTITY CASCADE; DROP TABLE instances;')
}