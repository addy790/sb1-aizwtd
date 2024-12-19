import { DataProcessor } from '../types/dataProcessor';

export class MaskProcessor implements DataProcessor {
  process(data: any, fields: string[]): any {
    const masked = JSON.parse(JSON.stringify(data));
    this.traverseAndMask(masked, fields);
    return masked;
  }

  private traverseAndMask(obj: any, fields: string[]): void {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.traverseAndMask(obj[key], fields);
      } else if (fields.includes(key)) {
        obj[key] = this.maskValue(obj[key]);
      }
    }
  }

  private maskValue(value: string): string {
    if (typeof value !== 'string') return value;
    return '*'.repeat(value.length);
  }
}