import { TypeOfError } from './type_of_error';

export class CalibrationError implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'calibration error';
  }
  adjustValueCapability(value: number): number {
    return value + 3;
  }
}
