import { DataProcessor } from '../types/dataProcessor';

export class PerturbProcessor implements DataProcessor {
  process(data: any, percentage: number = 10): any {
    return this.traverseAndPerturb(JSON.parse(JSON.stringify(data)), percentage);
  }

  private traverseAndPerturb(obj: any, percentage: number): any {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = this.traverseAndPerturb(obj[key], percentage);
      } else if (typeof obj[key] === 'number') {
        const perturbation = (obj[key] * percentage) / 100;
        obj[key] += (Math.random() - 0.5) * perturbation;
      }
    }
    return obj;
  }
}