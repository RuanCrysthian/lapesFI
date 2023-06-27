import { Error } from '../models/error';
import { Request, Response } from 'express';
import { Resource } from '../models/resource';
import { Bias } from '../models/bias';
import { Drift } from '../models/drift';
import { LossAccuracy } from '../models/loss_accuracy';
import { CalibrationError } from '../models/calibration_error';
import { Freezing } from '../models/freezing';

export class ErrorController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { uuid, type_of_error, error_duration } = req.body;
      const resource = await Resource.getByID(uuid);

      if (resource != null) {
        const capabilities = resource?.capabilities;
        let error;

        for (const capability of capabilities) {
          switch (type_of_error) {
            case 'bias':
              error = new Error(
                uuid,
                new Bias(),
                error_duration,
                capability.value,
              );
              break;
            case 'drift':
              error = new Error(
                uuid,
                new Drift(),
                error_duration,
                capability.value,
              );
              break;
            case 'loss accuracy':
              error = new Error(
                uuid,
                new LossAccuracy(),
                error_duration,
                capability.value,
              );
              break;
            case 'calibration error':
              error = new Error(
                uuid,
                new CalibrationError(),
                error_duration,
                capability.value,
              );
              break;
            case 'freezing':
              error = new Error(
                uuid,
                new Freezing(),
                error_duration,
                capability.value,
              );
              break;
            default:
              res.status(500).json({ error: 'Type of Error does exist!' });
              break;
          }
          await error?.save();
        }
        res.status(201).json({ message: 'Error was injected!' });
      } else {
        res.status(500).json({ error: 'Resource not found!' });
        return;
      }
    } catch (error) {
      console.error('Error retrieving the resource:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the resource' });
    }
  }
}
