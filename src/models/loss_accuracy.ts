import { TypeOfError } from './type_of_error';

export class LossAccuracy implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'loss accuracy';
  }
  adjustValueCapability(value: number, intensity: number): number {
    const randomOperator = Math.random() < 0.5 ? '+' : '_';

    if (randomOperator === '+') {
      return value + intensity;
    } else {
      return value - intensity;
    }
  }
}
