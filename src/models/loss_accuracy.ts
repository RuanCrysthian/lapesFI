import { TypeOfError } from './type_of_error';

export class LossAccuracy implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'loss accuracy';
  }
  adjustValueCapability(value: number): number {
    return value + 5;
  }
}
