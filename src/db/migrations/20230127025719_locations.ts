import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('locations', (table)=>{
        table.increments('location_id').primary();
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.integer('parent_id');
        table.jsonb('position').notNullable();
        table.boolean('initialized').defaultTo(false);
        table.jsonb('properties').notNullable();
        table.integer('blob_id').references('blobs.blob_id').notNullable().onDelete('CASCADE');
        table.integer('instance_id').references('instances.instance_id').notNullable().onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw('TRUNCATE locations RESTART IDENTITY CASCADE; DROP TABLE locations;')
}

