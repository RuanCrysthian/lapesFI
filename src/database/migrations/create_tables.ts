import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('resource', function (table) {
    table.string('uuid').primary();
    table.string('description', 255).notNullable();
    table.string('resource_environment', 255).notNullable();
  });

  console.log('Create the Resource table');

  await knex.schema.createTable('capability', function (table) {
    table.string('name', 255).notNullable();
    table.double('value').notNullable();
    table.string('resource_uuid').unsigned();
    table.foreign('resource_uuid').references('resource.uuid');
  });

  console.log('Create the Capability table');

  await knex.schema.createTable('error', function (table) {
    table.string('error_uuid').primary();
    table.string('resource_uuid').unsigned();
    table.string('type_of_error');
    table.integer('error_duration');
    table.decimal('capability_value', 10, 3);
    table.decimal('capability_error', 10, 3);
    table.foreign('resource_uuid').references('resource.uuid');
  });

  console.log('Create the Error table');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('capability');
  await knex.schema.dropTableIfExists('resource');
  await knex.schema.dropTable('error');
}
