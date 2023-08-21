/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export class InterscityApi {
  private baseurl: string;
  private resource_uuid: string;

  constructor(resource_uuid: string) {
    this.baseurl = 'http://10.10.10.104:8000';
    this.resource_uuid = resource_uuid;
  }

  private async fetchDataFromDataCollector(): Promise<any> {
    try {
      const { data } = await axios.get(
        `${this.baseurl}/collector/resources/${this.resource_uuid}/data`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
    } catch (error) {
      console.error('Error fetching data from data collector:', error);
      throw error;
    }
  }

  public async getCapabilitiesFromResource() {
    try {
      const data = await this.fetchDataFromDataCollector();
      const resources = data.resources;
      if (resources && resources.length > 0) {
        const capabilities = resources[0].capabilities;
        const env_monitoring = capabilities.environment_monitoring;
        return env_monitoring;
      } else {
        console.log('No resources found.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
