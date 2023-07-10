import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('resource', function (table) {
    table.string('uuid').primary();
    table.string('description');
    table.string('location');
  });

  console.log('Create the Resource table');

  await knex.schema.createTable('capability', function (table) {
    table.string('uuid').primary();
    table.string('name');
    table.string('function');
    table.string('description');
    table.string('resource_uuid').unsigned();
    table.foreign('resource_uuid').references('resource.uuid');
  });

  console.log('Create the Capability table');

  await knex.schema.createTable('fault', function (table) {
    table.string('capability_uuid').unsigned();
    table.string('type_of_error');
    table.decimal('sensor_value', 10, 3);
    table.decimal('sensor_error', 10, 3);
    table.foreign('capability_uuid').references('capability.uuid');
  });

  console.log('Create the Error table');

  await knex.schema.createTable('sensor_value', function (table) {
    table.increments('id').primary();
    table.decimal('value', 10, 3);
    table.string('date');
    table.string('capability_uuid').unsigned();
    table.foreign('capability_uuid').references('capability.uuid');
  });

  console.log('Create the SensorValue table');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sensor_value');
  await knex.schema.dropTable('capability');
  await knex.schema.dropTable('error');
  await knex.schema.dropTable('resource');
}
