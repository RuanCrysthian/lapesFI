import { TypeOfError } from './type_of_error';

export class Drift implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'drift';
  }
  adjustValueCapability(value: number): number {
    const randomValue = Math.floor(Math.random() * 5) + 2;
    return value - randomValue;
  }
}
