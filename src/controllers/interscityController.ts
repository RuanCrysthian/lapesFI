/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { InterscityApi } from '../helpers/InterscityApi';
import { InterscityFault } from '../models/interscity_fault';
import { Bias } from '../models/bias';
import { CalibrationError } from '../models/calibration_error';
import { Drift } from '../models/drift';
import { Freezing } from '../models/freezing';
import { LossAccuracy } from '../models/loss_accuracy';

export class InterscityController {
  private static async getCapabilityFromResourceUuid(
    uuid: string,
  ): Promise<any> {
    try {
      const api = new InterscityApi(uuid);
      const capabilities = await api.getCapabilitiesFromResource();
      return capabilities;
    } catch (error) {
      console.error('Erro ao buscar Resource:', error);
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { uuid, type_of_error, initial_date, final_date, intensity } =
        req.body;
      const capabilities =
        await InterscityController.getCapabilityFromResourceUuid(uuid);

      if (!capabilities) {
        res.status(404).json({ error: 'Resource not found!' });
        return;
      }
      const errorInstances = [];

      for (const capability of capabilities) {
        let errorInstance;

        switch (type_of_error) {
          case 'bias':
            errorInstance = new InterscityFault(
              uuid,
              new Bias(),
              capability.date,
              initial_date,
              final_date,
              intensity,
              capability.temperature,
              capability.humidity,
            );
            break;
          case 'drift':
            errorInstance = new InterscityFault(
              uuid,
              new Drift(),
              capability.date,
              initial_date,
              final_date,
              intensity,
              capability.temperature,
              capability.humidity,
            );
            break;
          case 'loss accuracy':
            errorInstance = new InterscityFault(
              uuid,
              new LossAccuracy(),
              capability.date,
              initial_date,
              final_date,
              intensity,
              capability.temperature,
              capability.humidity,
            );
            break;
          case 'calibration error':
            errorInstance = new InterscityFault(
              uuid,
              new CalibrationError(),
              capability.date,
              initial_date,
              final_date,
              intensity,
              capability.temperature,
              capability.humidity,
            );
            break;
          case 'freezing':
            errorInstance = new InterscityFault(
              uuid,
              new Freezing(),
              capability.date,
              initial_date,
              final_date,
              intensity,
              capability.temperature,
              capability.humidity,
            );
            break;
          default:
            res.status(400).json({ error: 'Invalid type of error!' });
            return;
        }

        errorInstances.push(errorInstance);
      }
      console.log(errorInstances);
      await Promise.all(errorInstances.map((error) => error.save()));

      res.status(201).json({ message: 'Fault was injected!' });
    } catch (error) {
      console.error('Error retrieving the capability:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the capability' });
    }
  }

  static async getAllFault(req: Request, res: Response) {
    try {
      const errors = await InterscityFault.getAll();
      res.status(200).json(errors);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the Erros' });
    }
  }
}
