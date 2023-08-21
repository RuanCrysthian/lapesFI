import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('interscity_fault', function (table) {
    table.string('resource_uuid').unsigned().notNullable();
    table.string('type_of_error').notNullable();
    table.string('sensor_date').notNullable();
    table.string('initial_date').notNullable();
    table.string('final_date').notNullable();
    table.decimal('intensity', 10, 3).notNullable();
    table.decimal('temperature_value', 10, 3).notNullable();
    table.decimal(' humidity_value', 10, 3).notNullable();
    table.decimal('temperature_value_error', 10, 3).notNullable();
    table.decimal(' humidity_value_error', 10, 3).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sensor_value');
  await knex.schema.dropTable('interscity_fault');
  await knex.schema.dropTable('fault');
  await knex.schema.dropTable('capability');
  await knex.schema.dropTable('resource');
}
