import { TypeOfError } from './type_of_error';

export class Drift implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'drift';
  }
  adjustValueCapability(value: number): number {
    return value + 10;
  }
}
