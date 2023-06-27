import { TypeOfError } from './type_of_error';

export class Freezing implements TypeOfError {
  type: string;
  constructor() {
    this.type = 'freezing';
  }
  adjustValueCapability(value: number): number {
    return value;
  }
}
