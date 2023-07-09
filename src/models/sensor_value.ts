export class SensorValue {
  capability_uuid: string;
  value: number;
  date: string;

  constructor(value: number, date: string, capability_uuid: string) {
    this.capability_uuid = capability_uuid;
    this.validateTimestamp(date);
    this.value = value;
    this.date = date;
  }

  private validateTimestamp(timestamp: string): void {
    const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z$/;

    if (!timestampRegex.test(timestamp)) {
      throw new Error('O valor do timestamp é inválido');
    }
  }
}
