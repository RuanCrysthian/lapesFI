import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('resource', function (table) {
    table.string('uuid').primary().notNullable();
    table.string('description').notNullable();
    table.string('location').notNullable();
  });

  console.log('Create the Resource table');

  await knex.schema.createTable('capability', function (table) {
    table.string('uuid').primary().notNullable();
    table.string('name').notNullable();
    table.string('function').notNullable();
    table.string('description').notNullable();
    table.string('resource_uuid').unsigned().notNullable();
    table
      .foreign('resource_uuid')
      .references('resource.uuid')
      .onDelete('CASCADE');
  });

  console.log('Create the Capability table');

  await knex.schema.createTable('fault', function (table) {
    table.string('capability_uuid').unsigned().notNullable();
    table.string('type_of_error').notNullable();
    table.string('sensor_date').notNullable();
    table.string('initial_date').notNullable();
    table.string('final_date').notNullable();
    table.decimal('intensity', 10, 3).notNullable();
    table.decimal('sensor_value', 10, 3).notNullable();
    table.decimal('sensor_error', 10, 3).notNullable();
    table
      .foreign('capability_uuid')
      .references('capability.uuid')
      .onDelete('CASCADE');
  });

  console.log('Create the Fault table');

  await knex.schema.createTable('sensor_value', function (table) {
    table.increments('id').primary().notNullable();
    table.decimal('value', 10, 3).notNullable();
    table.string('date').notNullable();
    table.string('capability_uuid').unsigned().notNullable();
    table
      .foreign('capability_uuid')
      .references('capability.uuid')
      .onDelete('CASCADE');
  });

  console.log('Create the SensorValue table');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sensor_value');
  await knex.schema.dropTable('fault');
  await knex.schema.dropTable('capability');
  await knex.schema.dropTable('resource');
}
