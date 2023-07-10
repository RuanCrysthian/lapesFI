import { TypeOfError } from './type_of_error';

export class LossAccuracy implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'loss accuracy';
  }
  adjustValueCapability(value: number): number {
    const randomOperator = Math.random() < 0.5 ? '+' : '_';
    const randomValue = Math.floor(Math.random() * 5) + 1;

    if (randomOperator === '+') {
      return value + randomValue;
    } else {
      return value - randomValue;
    }
  }
}
