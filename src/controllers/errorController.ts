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

      if (!resource) {
        res.status(404).json({ error: 'Resource not found!' });
        return;
      }

      const capabilities = resource.capabilities;
      const errorInstances = [];

      for (const capability of capabilities) {
        let errorInstance;

        switch (type_of_error) {
          case 'bias':
            errorInstance = new Error(
              uuid,
              new Bias(),
              error_duration,
              capability.value,
            );
            break;
          case 'drift':
            errorInstance = new Error(
              uuid,
              new Drift(),
              error_duration,
              capability.value,
            );
            break;
          case 'loss accuracy':
            errorInstance = new Error(
              uuid,
              new LossAccuracy(),
              error_duration,
              capability.value,
            );
            break;
          case 'calibration error':
            errorInstance = new Error(
              uuid,
              new CalibrationError(),
              error_duration,
              capability.value,
            );
            break;
          case 'freezing':
            errorInstance = new Error(
              uuid,
              new Freezing(),
              error_duration,
              capability.value,
            );
            break;
          default:
            res.status(400).json({ error: 'Invalid type of error!' });
            return;
        }

        errorInstances.push(errorInstance);
      }

      await Promise.all(errorInstances.map((error) => error.save()));

      res.status(201).json({ message: 'Error was injected!' });
    } catch (error) {
      console.error('Error retrieving the resource:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the resource' });
    }
  }

  static async getAllErrors(req: Request, res: Response) {
    try {
      const errors = await Error.getAll();
      res.status(200).json(errors);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the Erros' });
    }
  }
}
