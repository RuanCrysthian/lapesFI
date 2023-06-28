import { v4 as uuidv4 } from 'uuid';
import { TypeOfError } from './type_of_error';
import pool from '../database/db';
import { Freezing } from './freezing';
import { CalibrationError } from './calibration_error';
import { Bias } from './bias';
import { Drift } from './drift';
import { LossAccuracy } from './loss_accuracy';

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

  static async getAll(): Promise<Error[]> {
    const client = await pool.connect();
    const errors: Error[] = [];

    try {
      const queryText = 'SELECT * FROM error';
      const result = await client.query(queryText);

      if (result && result.rows.length > 0) {
        for (const row of result.rows) {
          let error: Error | null = null;

          switch (row.type_of_error) {
            case 'bias':
              error = new Error(
                row.resource_uuid,
                new Bias(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            case 'drift':
              error = new Error(
                row.resource_uuid,
                new Drift(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            case 'loss accuracy':
              error = new Error(
                row.resource_uuid,
                new LossAccuracy(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            case 'calibration error':
              error = new Error(
                row.resource_uuid,
                new CalibrationError(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            case 'freezing':
              error = new Error(
                row.resource_uuid,
                new Freezing(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            default:
              console.warn('Tipo de erro desconhecido:', row.type_of_error);
          }

          if (error) {
            errors.push(error);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar o Error:', error);
      throw error;
    } finally {
      client.release();
    }

    return errors;
  }

  static async getErrorsByResourceUUID(resourceUUID: string): Promise<Error[]> {
    const client = await pool.connect();
    const errors: Error[] = [];

    try {
      const queryText = 'SELECT * FROM error WHERE resource_uuid = $1';
      const result = await client.query(queryText, [resourceUUID]);

      if (result && result.rows.length > 0) {
        for (const row of result.rows) {
          let error: Error | null = null;

          switch (row.type_of_error) {
            case 'bias':
              error = new Error(
                row.resource_uuid,
                new Bias(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            case 'drift':
              error = new Error(
                row.resource_uuid,
                new Drift(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            case 'loss accuracy':
              error = new Error(
                row.resource_uuid,
                new LossAccuracy(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            case 'calibration error':
              error = new Error(
                row.resource_uuid,
                new CalibrationError(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            case 'freezing':
              error = new Error(
                row.resource_uuid,
                new Freezing(),
                row.error_duration,
                parseFloat(row.capability_value),
              );
              break;
            default:
              console.warn('Tipo de erro desconhecido:', row.type_of_error);
          }

          if (error) {
            errors.push(error);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar os Erros:', error);
      throw error;
    } finally {
      client.release();
    }

    return errors;
  }
}
