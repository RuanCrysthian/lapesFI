export interface TypeOfError {
  type: string;
  adjustValueCapability(value: number, intensity: number): number;
}
