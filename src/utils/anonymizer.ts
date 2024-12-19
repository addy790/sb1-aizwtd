import { faker } from '@faker-js/faker';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'your-secret-key'; // In production, use environment variables

export class DataAnonymizer {
  private static instance: DataAnonymizer;
  private originalDataMap: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): DataAnonymizer {
    if (!DataAnonymizer.instance) {
      DataAnonymizer.instance = new DataAnonymizer();
    }
    return DataAnonymizer.instance;
  }

  maskData(data: any, fields: string[]): any {
    const masked = JSON.parse(JSON.stringify(data));
    this.traverseAndMask(masked, fields);
    return masked;
  }

  private traverseAndMask(obj: any, fields: string[]): void {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.traverseAndMask(obj[key], fields);
      } else if (fields.includes(key)) {
        const original = obj[key];
        obj[key] = this.maskValue(original);
        this.storeOriginalValue(key, original);
      }
    }
  }

  private maskValue(value: string): string {
    if (typeof value !== 'string') return value;
    return '*'.repeat(value.length);
  }

  private storeOriginalValue(key: string, value: any): void {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      ENCRYPTION_KEY
    ).toString();
    this.originalDataMap.set(key, encryptedValue);
  }

  randomizeData(data: any): any {
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

  perturbData(data: any, percentage: number = 10): any {
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

  recoverData(key: string): any | null {
    const encryptedValue = this.originalDataMap.get(key);
    if (!encryptedValue) return null;

    try {
      const decryptedValue = CryptoJS.AES.decrypt(
        encryptedValue,
        ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error('Error recovering data:', error);
      return null;
    }
  }
}