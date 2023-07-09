/* eslint-disable prettier/prettier */
import { Resource } from '../models/resource';
import { Request, Response } from 'express';
import { Capability } from '../models/capability';
import { SensorValue } from '../models/sensor_value';
import pool from '../database/db';

export class ResourceController {
  static async createResource(req: Request, res: Response): Promise<void> {
    const { description, capabilities, location } = req.body;
    
    try {

      const capabilityInstances = capabilities.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (capabilityJson: any) =>
          new Capability(capabilityJson.name, capabilityJson.description),
      );

      const resource = new Resource(description, capabilityInstances, location);
      await resource.save();
      res.status(201).json(resource);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      res.status(500).json({ error: 'Erro ao salvar os dados' });
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

  static async deleteResource(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      console.log(uuid);

      await Resource.delete(uuid);

      res.sendStatus(204); // No Content
    } catch (error) {
      console.error('Erro ao excluir o recurso:', error);
      res.status(500).json({ error: 'Erro ao excluir o recurso' });
    }
  }

  
  static async saveSensorData(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;
    const { capability_uuid, sensor_values } = req.body;

    console.log(uuid, capability_uuid);
  
    try {
      // Verificar se o recurso existe
      const resource = await Resource.getByID(uuid);
      console.log(resource);
      if (!resource) {
        res.status(404).json({ error: 'Recurso não encontrado' });
        return;
      }
  
      // Verificar se a capacidade existe no recurso
      let sensorCapability;
      for (const capability of resource.capabilities) {
        if (capability.uuid === capability_uuid && capability.function === 'sensor') {
          sensorCapability = capability;
          break;
        }
      }
  
      if (!sensorCapability) {
        res.status(400).json({ error: 'Recurso não possui a capacidade de sensor especificada' });
        return;
      }
  
      // Salvar os valores do sensor no banco de dados
      const sensorValueInsertQuery =
        'INSERT INTO sensor_value (capability_uuid, value, date) VALUES ($1, $2, $3)';
  
      for (const sensorValueData of sensor_values) {
        const { value, date } = sensorValueData;
        const sensorValue = new SensorValue(value, date, sensorCapability.uuid);
        console.log(sensorValue);
  
        const sensorValueInsertValues = [
          sensorValue.capability_uuid,
          sensorValue.value,
          sensorValue.date,
        ];
        
        console.log(sensorValueInsertValues);
        await pool.query(sensorValueInsertQuery, sensorValueInsertValues);
      }
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Erro ao salvar os valores do sensor:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  
}
