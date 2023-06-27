import { v4 as uuidv4 } from 'uuid';
import { TypeOfError } from './type_of_error';
import pool from '../database/db';

export class Error {
  error_uuid: string;
  resource_uuid: string;
  type_of_error: TypeOfError;
  error_duration: number;
  capability_value: number;
  capability_error: number;

  constructor(
    resource_uuid: string,
    type_of_error: TypeOfError,
    error_duration: number,
    capability_value: number,
  ) {
    this.error_uuid = uuidv4();
    this.resource_uuid = resource_uuid;
    this.type_of_error = type_of_error;
    this.error_duration = error_duration;
    this.capability_value = capability_value;
    this.capability_error = this.injectError();
  }

  public injectError(): number {
    const result = this.type_of_error.adjustValueCapability(
      this.capability_value,
    );
    return result;
  }

  public async save(): Promise<void> {
    const queryText =
      'INSERT INTO error (error_uuid, resource_uuid, type_of_error, error_duration, capability_value, capability_error) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [
      this.error_uuid,
      this.resource_uuid,
      this.type_of_error.type,
      this.error_duration,
      this.capability_value,
      this.capability_error,
    ];

    try {
      const client = await pool.connect();
      await client.query(queryText, values);
      client.release();
    } catch (error) {
      console.error('Erro ao salvar o Error:', error);
      throw error;
    }
  }
}
