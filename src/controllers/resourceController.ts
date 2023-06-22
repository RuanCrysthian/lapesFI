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
      res
        .status(500)
        .json({ error: 'Erro ao criar recurso no banco de dados' });
    }
  }
}
