import { v4 as uuidv4 } from 'uuid';

export class Capability {
  capability_uuid: string;
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.capability_uuid = uuidv4();
    this.name = name;
    this.value = value;
  }
}
