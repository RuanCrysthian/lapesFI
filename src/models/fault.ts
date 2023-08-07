import { TypeOfError } from './type_of_error';
import pool from '../database/db';
import { Freezing } from './freezing';
import { CalibrationError } from './calibration_error';
import { Bias } from './bias';
import { Drift } from './drift';
import { LossAccuracy } from './loss_accuracy';

export class Fault {
  capability_uuid: string;
  type_of_error: TypeOfError;
  sensor_date: string;
  inital_date: string;
  final_date: string;
  intensity: number;
  sensor_value: number;
  sensor_error: number;

  constructor(
    capability_uuid: string,
    type_of_error: TypeOfError,
    sensor_date: string,
    inital_date: string,
    final_date: string,
    intensity: number,
    sensor_value: number,
  ) {
    this.capability_uuid = capability_uuid;
    this.type_of_error = type_of_error;
    this.sensor_date = sensor_date;
    this.inital_date = inital_date;
    this.final_date = final_date;
    this.intensity = intensity;
    this.sensor_value = sensor_value;
    this.sensor_error = this.injectError();
  }

  // TODO: verificar se está entre o tempo de inicio e final para que assim seja injetado os erros.
  public injectError(): number {
    let result: number;
    if (
      this.sensor_date >= this.inital_date &&
      this.sensor_date <= this.final_date
    ) {
      if (this.type_of_error.type === 'freezing') result = 20;
      else
        result = this.type_of_error.adjustValueCapability(
          this.sensor_value,
          this.intensity,
        );
    } else {
      result = this.sensor_value;
    }
    return result;
  }

  public async save(): Promise<void> {
    const queryText =
      'INSERT INTO fault (capability_uuid, type_of_error, sensor_date, initial_date, final_date, intensity, sensor_value, sensor_error) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [
      this.capability_uuid,
      this.type_of_error.type,
      this.sensor_date,
      this.inital_date,
      this.final_date,
      this.intensity,
      this.sensor_value,
      this.sensor_error,
    ];

    try {
      const client = await pool.connect();
      await client.query(queryText, values);
      client.release();
    } catch (error) {
      console.error('Failed to save Fault:', error);
      throw error;
    }
  }

  static async getAll(): Promise<Fault[]> {
    const client = await pool.connect();
    const faults: Fault[] = [];

    try {
      const queryText = 'SELECT * FROM fault';
      const result = await client.query(queryText);

      if (result && result.rows.length > 0) {
        for (const row of result.rows) {
          let fault: Fault | null = null;

          switch (row.type_of_error) {
            case 'bias':
              fault = new Fault(
                row.capability_uuid,
                new Bias(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            case 'drift':
              fault = new Fault(
                row.capability_uuid,
                new Drift(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            case 'loss accuracy':
              fault = new Fault(
                row.capability_uuid,
                new LossAccuracy(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            case 'calibration error':
              fault = new Fault(
                row.capability_uuid,
                new CalibrationError(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            case 'freezing':
              fault = new Fault(
                row.capability_uuid,
                new Freezing(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            default:
              console.warn('Unknown error type:', row.type_of_error);
          }

          if (fault) {
            faults.push(fault);
          }
        }
      }
    } catch (error) {
      console.error('Failed to retrieve error:', error);
      throw error;
    } finally {
      client.release();
    }

    return faults;
  }

  static async getFaultCapabilityUUID(
    capability_uuid: string,
  ): Promise<Fault[]> {
    const client = await pool.connect();
    const faults: Fault[] = [];

    try {
      const queryText = 'SELECT * FROM fault WHERE capability_uuid = $1';
      const result = await client.query(queryText, [capability_uuid]);

      if (result && result.rows.length > 0) {
        for (const row of result.rows) {
          let fault: Fault | null = null;

          switch (row.type_of_error) {
            case 'bias':
              fault = new Fault(
                row.capability_uuid,
                new Bias(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            case 'drift':
              fault = new Fault(
                row.capability_uuid,
                new Drift(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            case 'loss accuracy':
              fault = new Fault(
                row.capability_uuid,
                new LossAccuracy(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            case 'calibration error':
              fault = new Fault(
                row.capability_uuid,
                new CalibrationError(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            case 'freezing':
              fault = new Fault(
                row.capability_uuid,
                new Freezing(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.sensor_value),
              );
              break;
            default:
              console.warn('Unknown error type:', row.type_of_error);
          }

          if (fault) {
            faults.push(fault);
          }
        }
      }
    } catch (error) {
      console.error('failed to retrieve error:', error);
      throw error;
    } finally {
      client.release();
    }

    return faults;
  }

  static async deleteByCapabilityUUID(capability_uuid: string): Promise<void> {
    const client = await pool.connect();

    try {
      const queryText = 'DELETE FROM fault WHERE capability_uuid = $1';
      await client.query(queryText, [capability_uuid]);
    } catch (error) {
      console.error('Failed to delete faults:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}
