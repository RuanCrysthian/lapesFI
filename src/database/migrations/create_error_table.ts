import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('error', function (table) {
    table.string('error_uuid').primary();
    table.string('resource_uuid').unsigned();
    table.string('type_of_error');
    table.integer('error_duration');
    table.decimal('capability_value', 10, 3);
    table.decimal('capability_error', 10, 3);
    table.foreign('resource_uuid').references('resource.uuid');
  });
  console.log('Tabela "error" criada com sucesso!');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('error');
  console.log('Tabela "errors" removida com sucesso!');
}
