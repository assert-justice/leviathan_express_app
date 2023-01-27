import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('words', (table) => {
        table.increments('word_id').primary();
        table.string('word').notNullable();
        table.jsonb('tags').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('words');
}