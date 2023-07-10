/* eslint-disable prettier/prettier */
import { Fault } from '../models/fault';
import { Request, Response } from 'express';
import { Bias } from '../models/bias';
import { Drift } from '../models/drift';
import { LossAccuracy } from '../models/loss_accuracy';
import { CalibrationError } from '../models/calibration_error';
import { Freezing } from '../models/freezing';
import { Capability } from '../models/capability';


export class FaultController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { uuid, type_of_error } = req.body;
      const capabilities = await Capability.getSensorValuesByCapabilityUUID(uuid);

      if (!capabilities) {
        res.status(404).json({ error: 'Capability not found!' });
        return;
      }
      const sensor_values = capabilities[0].sensor_values;
      const errorInstances = [];
      
      for (const sensor_value of sensor_values) {
        let errorInstance;

        switch (type_of_error) {
          case 'bias':
            errorInstance = new Fault(uuid, new Bias(), sensor_value.value);
            break;
          case 'drift':
            errorInstance = new Fault(
              uuid,
              new Drift(),
              sensor_value.value,
            );
            break;
          case 'loss accuracy':
            errorInstance = new Fault(
              uuid,
              new LossAccuracy(),
              sensor_value.value,
            );
            break;
          case 'calibration error':
            errorInstance = new Fault(
              uuid,
              new CalibrationError(),
              sensor_value.value,
            );
            break;
          case 'freezing':
            errorInstance = new Fault(
              uuid,
              new Freezing(),
              sensor_value.value,
            );
            break;
          default:
            res.status(400).json({ error: 'Invalid type of error!' });
            return;
        }

        errorInstances.push(errorInstance);
      }

      await Promise.all(errorInstances.map((error) => error.save()));

      res.status(201).json({ message: 'Fault was injected!' });
    } catch (error) {
      console.error('Error retrieving the capability:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the capability' });
    }
  }
  
  static async getAllFault(req: Request, res: Response) {
    try {
      const errors = await Fault.getAll();
      res.status(200).json(errors);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the Erros' });
    }
  }
  
  static async getFaultByUUID(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const fault = await Fault.getFaultCapabilityUUID(uuid);

      if (fault) {
        res.status(200).json(fault);
      } else {
        res.status(404).json({ error: 'Fault not found' });
      }
    } catch (error) {
      console.error('Error retrieving the resource:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the Error' });
    }
  }

  static async deleteFault(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      await Fault.deleteByCapabilityUUID(uuid);
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting the Fault:', error);
      res.status(500).json({ error: 'Error deleting the Fault' });
    }
  }
  
}
