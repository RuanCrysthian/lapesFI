import { TypeOfError } from './type_of_error';

export class Drift implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'drift';
  }
  adjustValueCapability(value: number, intensity: number): number {
    return value + Math.pow(2, intensity);
  }
}
