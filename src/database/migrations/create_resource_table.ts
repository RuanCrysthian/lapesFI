import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('resource', function (table) {
    table.string('uuid').primary();
    table.string('description', 255).notNullable();
    table.string('resource_environment', 255).notNullable();
  });

  await knex.schema.createTable('capability', function (table) {
    table.string('capability_uuid').primary();
    table.string('name', 255).notNullable();
    table.double('value').notNullable();
    table.string('resource_uuid').unsigned();
    table.foreign('resource_uuid').references('resource.uuid');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('capability');
  await knex.schema.dropTableIfExists('resource');
}
