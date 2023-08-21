import pool from '../database/db';
import { Bias } from './bias';
import { CalibrationError } from './calibration_error';
import { Drift } from './drift';
import { Freezing } from './freezing';
import { LossAccuracy } from './loss_accuracy';
import { TypeOfError } from './type_of_error';

export class InterscityFault {
  resource_uuid: string;
  type_of_error: TypeOfError;
  sensor_date: string;
  initial_date: string;
  final_date: string;
  intensity: number;
  temperature_value: number;
  humidity_value: number;
  temperature_value_error: number;
  humidity_value_error: number;

  constructor(
    resource_uuid: string,
    type_of_error: TypeOfError,
    sensor_date: string,
    initial_date: string,
    final_date: string,
    intensity: number,
    temperature_value: number,
    humidity_value: number,
  ) {
    this.resource_uuid = resource_uuid;
    this.type_of_error = type_of_error;
    this.sensor_date = sensor_date;
    this.initial_date = initial_date;
    this.final_date = final_date;
    this.intensity = intensity;
    this.temperature_value = temperature_value;
    this.humidity_value = humidity_value;
    this.temperature_value_error = this.injectError(this.temperature_value);
    this.humidity_value_error = this.injectError(this.humidity_value);
  }

  public injectError(value: number): number {
    let result: number;
    if (
      this.sensor_date >= this.initial_date &&
      this.sensor_date <= this.final_date
    ) {
      if (this.type_of_error.type === 'freezing') result = 20;
      else
        result = this.type_of_error.adjustValueCapability(
          value,
          this.intensity,
        );
    } else {
      result = value;
    }
    return result;
  }

  public async save(): Promise<void> {
    const queryText =
      'INSERT INTO interscity_fault (resource_uuid, type_of_error, sensor_date, initial_date, final_date, intensity, temperature_value, humidity_value, temperature_value_error, humidity_value_error) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    const values = [
      this.resource_uuid,
      this.type_of_error.type,
      this.sensor_date,
      this.initial_date,
      this.final_date,
      this.intensity,
      this.temperature_value,
      this.humidity_value,
      this.temperature_value_error,
      this.humidity_value_error,
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

  static async getAll(): Promise<InterscityFault[]> {
    const client = await pool.connect();
    const faults: InterscityFault[] = [];

    try {
      const queryText =
        'SELECT * FROM interscity_fault ORDER BY sensor_date ASC';
      const result = await client.query(queryText);

      if (result && result.rows.length > 0) {
        for (const row of result.rows) {
          let fault: InterscityFault | null = null;

          switch (row.type_of_error) {
            case 'bias':
              fault = new InterscityFault(
                row.resource_uuid,
                new Bias(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.temperature_value),
                parseFloat(row.humidity_value),
              );
              break;
            case 'drift':
              fault = new InterscityFault(
                row.resource_uuid,
                new Drift(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.temperature_value),
                parseFloat(row.humidity_value),
              );
              break;
            case 'loss accuracy':
              fault = new InterscityFault(
                row.resource_uuid,
                new LossAccuracy(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.temperature_value),
                parseFloat(row.humidity_value),
              );
              break;
            case 'calibration error':
              fault = new InterscityFault(
                row.resource_uuid,
                new CalibrationError(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.temperature_value),
                parseFloat(row.humidity_value),
              );
              break;
            case 'freezing':
              fault = new InterscityFault(
                row.resource_uuid,
                new Freezing(),
                row.sensor_date,
                row.initial_date,
                row.final_date,
                parseFloat(row.intensity),
                parseFloat(row.temperature_value),
                parseFloat(row.humidity_value),
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
}
