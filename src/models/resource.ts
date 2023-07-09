import { QueryResult } from 'pg';
import pool from '../database/db';
import { Capability } from './capability';
import { v4 as uuidv4 } from 'uuid';

export class Resource {
  uuid: string;
  description: string;
  capabilities: Capability[];
  location: string;

  constructor(
    description: string,
    capabilities: Capability[],
    location: string,
  ) {
    this.uuid = uuidv4();
    this.description = description;
    this.capabilities = capabilities || [];
    this.location = location;
  }

  async save(): Promise<void> {
    try {
      const client = await pool.connect();

      try {
        // Inserir o Resource
        const resourceInsertQuery =
          'INSERT INTO resource (uuid, description, location) VALUES ($1, $2, $3)';
        const values = [this.uuid, this.description, this.location];
        await client.query(resourceInsertQuery, values);

        // Inserir as Capability
        for (const capability of this.capabilities) {
          const capabilityInsertQuery =
            'INSERT INTO capability (uuid, name, function, description, resource_uuid) VALUES ($1, $2, $3, $4, $5)';
          const capabilityInsertValues = [
            capability.uuid,
            capability.name,
            capability.function,
            capability.description,
            this.uuid,
          ];
          await client.query(capabilityInsertQuery, capabilityInsertValues);
        }
      } catch (error) {
        console.error('Erro ao salvar o Resource:', error);
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  static async getAll(): Promise<Resource[]> {
    const client = await pool.connect();

    try {
      const queryText = `
        SELECT r.uuid, r.description, r.location, c.uuid as capability_uuid, c.name
        FROM resource r
        LEFT JOIN capability c ON r.uuid = c.resource_uuid
      `;
      const result: QueryResult = await client.query(queryText);

      const resourceMap: Map<string, Resource> = new Map();

      for (const row of result.rows) {
        const resourceUuid = row.uuid;

        if (!resourceMap.has(resourceUuid)) {
          const resource = new Resource(row.description, [], row.location);
          resource.uuid = resourceUuid;
          resourceMap.set(resourceUuid, resource);
        }

        if (row.capability_uuid) {
          const capability = new Capability(row.name, row.description);
          capability.uuid = row.capability_uuid;
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

  static async getByID(uuid: string): Promise<Resource | null> {
    const client = await pool.connect();

    try {
      const queryText = `
        SELECT r.uuid, r.description, r.location, c.uuid as capability_uuid, c.name
        FROM resource r
        LEFT JOIN capability c ON r.uuid = c.resource_uuid
        WHERE r.uuid = $1
      `;
      const result: QueryResult = await client.query(queryText, [uuid]);

      const resourceMap: Map<string, Resource> = new Map();

      for (const row of result.rows) {
        const resourceUuid = row.uuid;

        if (!resourceMap.has(resourceUuid)) {
          const resource = new Resource(row.description, [], row.location);
          resource.uuid = resourceUuid;
          resourceMap.set(resourceUuid, resource);
        }

        if (row.capability_uuid) {
          const capability = new Capability(row.name, row.description);
          capability.uuid = row.capability_uuid;
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

  static async delete(uuid: string): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Deletar as capacidades do recurso
      console.log('entrei no delete');
      const capabilityQueryText =
        'DELETE FROM capability WHERE resource_uuid = $1';
      const capabilityValues = [uuid];
      await client.query(capabilityQueryText, capabilityValues);

      console.log('estou deletando resource');
      // Deletar o recurso
      const queryText = 'DELETE FROM resource WHERE uuid = $1';
      const values = [uuid];
      await client.query(queryText, values);

      await client.query('COMMIT');
    } catch (error) {
      console.log('estou no catch');
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
