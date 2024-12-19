import { DataProcessor } from '../types/dataProcessor';
import { faker } from '@faker-js/faker';

export class RandomizeProcessor implements DataProcessor {
  process(data: any): any {
    return this.traverseAndRandomize(JSON.parse(JSON.stringify(data)));
  }

  private traverseAndRandomize(obj: any): any {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = this.traverseAndRandomize(obj[key]);
      } else {
        obj[key] = this.generateFakeData(key, obj[key]);
      }
    }
    return obj;
  }

  private generateFakeData(key: string, value: any): any {
    switch (typeof value) {
      case 'string':
        if (key.toLowerCase().includes('email')) {
          return faker.internet.email();
        } else if (key.toLowerCase().includes('name')) {
          return faker.person.fullName();
        } else if (key.toLowerCase().includes('phone')) {
          return faker.phone.number();
        }
        return faker.word.sample();
      case 'number':
        return faker.number.int({ min: 0, max: 1000 });
      default:
        return value;
    }
  }
}