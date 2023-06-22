import pool from '../database/db';
import { Capability } from './capability';
import { v4 as uuidv4 } from 'uuid';

export class Resource {
  uuid: string;
  description: string;
  capabilities: Capability[];
  resourceEnvironment: string;

  constructor(
    description: string,
    capabilities: Capability[],
    resourceEnvironment: string,
  ) {
    this.uuid = uuidv4();
    this.description = description;
    this.capabilities = capabilities;
    this.resourceEnvironment = resourceEnvironment;
  }

  // Função para salvar um recurso no banco de dados
  async save(): Promise<void> {
    const queryText =
      'INSERT INTO resource (uuid, description, resource_environment) VALUES ($1, $2, $3)';
    const values = [this.uuid, this.description, this.resourceEnvironment];

    try {
      const client = await pool.connect();
      await client.query(queryText, values);
      for (const capability of this.capabilities) {
        const capabilityQueryText =
          'INSERT INTO capability (capability_uuid, name, value, resource_uuid) VALUES ($1, $2, $3, $4)';
        const capabilityValues = [
          capability.capability_uuid,
          capability.name,
          capability.value,
          this.uuid,
        ];
        await client.query(capabilityQueryText, capabilityValues);
      }
      client.release();
    } catch (error) {
      console.error('Erro ao salvar o Resource:', error);
      throw error;
    }
  }
  /*
  // Função para deletar um recurso no banco de dados
  static async delete(uuid: string): Promise<void> {
    const pool = new Pool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Deletar as capacidades do recurso
      const capabilityQueryText =
        'DELETE FROM capabilities WHERE resource_uuid = $1';
      const capabilityValues = [uuid];

      await client.query(capabilityQueryText, capabilityValues);

      // Deletar o recurso
      const queryText = 'DELETE FROM resources WHERE uuid = $1';
      const values = [uuid];

      await client.query(queryText, values);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Função para obter todos os recursos do banco de dados
  static async getAll(): Promise<Resource[]> {
    const pool = new Pool();
    const client = await pool.connect();

    try {
      const queryText = 'SELECT * FROM resources';
      const result: QueryResult = await client.query(queryText);

      const resources: Resource[] = [];

      for (const row of result.rows) {
        const resource = new Resource(
          row.description,
          [],
          row.resource_environment,
        );
        resource.uuid = row.uuid;

        resources.push(resource);
      }

      return resources;
    } finally {
      client.release();
    }
  }

  // Função para obter um recurso filtrado por ID
  static async getByID(uuid: string): Promise<Resource | null> {
    const pool = new Pool();
    const client = await pool.connect();

    try {
      const queryText = 'SELECT * FROM resources WHERE uuid = $1';
      const values = [uuid];
      const result: QueryResult = await client.query(queryText, values);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      const resource = new Resource(
        row.description,
        [],
        row.resource_environment,
      );
      resource.uuid = row.uuid;

      // Obter as capacidades do recurso
      const capabilityQueryText =
        'SELECT * FROM capabilities WHERE resource_uuid = $1';
      const capabilityValues = [uuid];
      const capabilityResult: QueryResult = await client.query(
        capabilityQueryText,
        capabilityValues,
      );

      for (const capabilityRow of capabilityResult.rows) {
        const capability = new Capability(
          capabilityRow.name,
          capabilityRow.value,
        );
        capability.capability_uuid = capabilityRow.capability_uuid;

        resource.capabilities.push(capability);
      }

      return resource;
    } finally {
      client.release();
    }
  }
  */
}
