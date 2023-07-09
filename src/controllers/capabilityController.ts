import { Request, Response } from 'express';
import { Capability } from '../models/capability';

export class CapabilityController {
  static async getSensorByUUID(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const sensorValues = await Capability.getSensorValuesByCapabilityUUID(
        uuid,
      );
      res.json(sensorValues);
    } catch (error) {
      console.error('Erro ao obter os SensorValues:', error);
      res.status(500).json({ error: 'Erro ao obter os SensorValues' });
    }
  }
}
