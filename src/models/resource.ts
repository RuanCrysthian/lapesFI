import { QueryResult } from 'pg';
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
    this.capabilities = capabilities || [];
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
          'INSERT INTO capability (name, value, resource_uuid) VALUES ($1, $2, $3)';
        const capabilityValues = [capability.name, capability.value, this.uuid];
        await client.query(capabilityQueryText, capabilityValues);
      }
      client.release();
    } catch (error) {
      console.error('Erro ao salvar o Resource:', error);
      throw error;
    }
  }

  // Função para obter todos os recursos do banco de dados
  static async getAll(): Promise<Resource[]> {
    const client = await pool.connect();

    try {
      const queryText = `
        SELECT r.uuid, r.description, r.resource_environment, c.name, c.value
        FROM resource r
        LEFT JOIN capability c ON r.uuid = c.resource_uuid
      `;
      const result: QueryResult = await client.query(queryText);

      const resourceMap: Map<string, Resource> = new Map();

      for (const row of result.rows) {
        const resourceUuid = row.uuid;

        if (!resourceMap.has(resourceUuid)) {
          const resource = new Resource(
            row.description,
            [],
            row.resource_environment,
          );
          resource.uuid = resourceUuid;
          resourceMap.set(resourceUuid, resource);
        }

        if (resourceMap.has(resourceUuid)) {
          const capability = {
            name: row.name,
            value: row.value,
          };
          resourceMap.get(resourceUuid)?.capabilities.push(capability);
        }
      }

      const resources: Resource[] = Array.from(resourceMap.values());

      return resources;
    } catch (error) {
      console.error('Erro ao recuperar o Resource:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Função para deletar um recurso no banco de dados
  static async delete(uuid: string): Promise<void> {
    const client = await pool.connect();

    try {
      // Deletar as capacidades do recurso
      const capabilityQueryText =
        'DELETE FROM capabilities WHERE resource_uuid = $1';
      const capabilityValues = [uuid];

      await client.query(capabilityQueryText, capabilityValues);

      // Deletar o recurso
      const queryText = 'DELETE FROM resource WHERE uuid = $1';
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

  // Função para obter um recurso filtrado por ID
  static async getByID(uuid: string): Promise<Resource | null> {
    const client = await pool.connect();

    try {
      const queryText = `
        SELECT r.uuid, r.description, r.resource_environment, c.name, c.value
        FROM resource r
        LEFT JOIN capability c ON r.uuid = c.resource_uuid
        WHERE r.uuid = $1
      `;
      const result: QueryResult = await client.query(queryText, [uuid]);

      const resourceMap: Map<string, Resource> = new Map();

      for (const row of result.rows) {
        const resourceUuid = row.uuid;

        if (!resourceMap.has(resourceUuid)) {
          const resource = new Resource(
            row.description,
            [],
            row.resource_environment,
          );
          resource.uuid = resourceUuid;
          resourceMap.set(resourceUuid, resource);
        }

        if (resourceMap.has(resourceUuid)) {
          const capability = {
            name: row.name,
            value: row.value,
          };
          resourceMap.get(resourceUuid)?.capabilities.push(capability);
        }
      }

      const resource = Array.from(resourceMap.values())[0] || null;

      return resource;
    } catch (error) {
      console.error('Erro ao recuperar o Resource:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}
