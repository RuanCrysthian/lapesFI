import { TypeOfError } from './type_of_error';

export class Bias implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'bias';
  }
  adjustValueCapability(value: number): number {
    return value + 3;
  }
}
