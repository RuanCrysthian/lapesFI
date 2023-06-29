/* eslint-disable prettier/prettier */
import { Resource } from '../models/resource';
import { Request, Response } from 'express';
import { Capability } from '../models/capability';

export class ResourceController {
  static async createResource(req: Request, res: Response): Promise<void> {
    try {
      const { description, capabilities, resourceEnvironment } = req.body;

      const capabilityInstances = capabilities.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (capabilityJson: any) =>
          new Capability(capabilityJson.name, capabilityJson.value),
      );

      const resource = new Resource(
        description,
        capabilityInstances,
        resourceEnvironment,
      );
      await resource.save();

      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the resources' });
    }
  }

  static async getAllResource(req: Request, res: Response) {
    try {
      const resources = await Resource.getAll();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the resources' });
    }
  }

  static async getResourceByUUID(req: Request, res: Response) {
    try {
      const { uuid } = req.params; // Extrai o parâmetro UUID da requisição

      const resource = await Resource.getByID(uuid);

      if (resource) {
        res.status(200).json(resource);
      } else {
        res.status(404).json({ error: 'Resource not found' });
      }
    } catch (error) {
      console.error('Error retrieving the resource:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the resource' });
    }
  }
}
