import { TypeOfError } from './type_of_error';

export class CalibrationError implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'calibration error';
  }
  adjustValueCapability(value: number): number {
    const randomValue = Math.floor(Math.random() * 3) + 1;
    return value * randomValue;
  }
}
