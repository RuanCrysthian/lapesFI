import { TypeOfError } from './type_of_error';

export class Bias implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'bias';
  }
  adjustValueCapability(value: number): number {
    const randomValue = Math.floor(Math.random() * 3) + 1;
    return value + randomValue;
  }
}
