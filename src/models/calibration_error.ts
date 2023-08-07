import { TypeOfError } from './type_of_error';

export class CalibrationError implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'calibration error';
  }
  adjustValueCapability(value: number, intensity: number): number {
    return value * (intensity / 5);
  }
}
