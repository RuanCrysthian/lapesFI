import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('resource', function (table) {
    table.uuid('uuid').primary();
    table.string('description', 255).notNullable();
    table.string('resource_environment', 255).notNullable();
  });

  await knex.schema.createTable('capability', function (table) {
    table.uuid('capability_uuid').primary();
    table.string('name', 255).notNullable();
    table.integer('value').notNullable();
    table.uuid('resource_uuid').references('uuid').inTable('resource');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('capability');
  await knex.schema.dropTableIfExists('resource');
}
