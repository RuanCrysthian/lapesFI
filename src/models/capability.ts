import { v4 as uuidv4 } from 'uuid';
import pool from '../database/db';

export class Capability {
  uuid: string;
  name: string;
  function: string;
  description: string;

  constructor(name: string, description: string) {
    this.uuid = uuidv4();
    this.name = name;
    this.function = 'sensor';
    this.description = description;
  }

  static async getSensorValuesByCapabilityUUID(uuid: string): Promise<any[]> {
    const client = await pool.connect();

    try {
      const queryText = `
      SELECT c.uuid as capability_uuid, sv.value, sv.date
      FROM capability c
      LEFT JOIN sensor_value sv ON c.uuid = sv.capability_uuid
      WHERE c.uuid = $1
          `;
      const result = await client.query(queryText, [uuid]);

      const sensorValues = result.rows.map((row: any) => ({
        value: row.value,
        date: row.date,
        capability_uuid: row.capability_uuid,
      }));

      return this.formatSensorValuesResponse(sensorValues);
    } catch (error) {
      console.error('Erro ao obter os SensorValues:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public static formatSensorValuesResponse(sensorValues: any[]): any[] {
    const capabilityMap: Map<string, any> = new Map();

    for (const sensorValue of sensorValues) {
      const { capability_uuid, value, date } = sensorValue;

      if (!capabilityMap.has(capability_uuid)) {
        capabilityMap.set(capability_uuid, {
          capability_uuid: capability_uuid,
          sensor_values: [],
        });
      }

      capabilityMap.get(capability_uuid).sensor_values.push({
        value,
        date,
      });
    }

    const formattedResponse = Array.from(capabilityMap.values());

    return formattedResponse;
  }
}
