import CryptoJS from 'crypto-js';
import { EncryptionConfig } from '../../types/security';

export class EncryptionService {
  private static instance: EncryptionService;
  private config: EncryptionConfig = {
    algorithm: 'AES',
    keySize: 256,
    mode: 'GCM'
  };

  private constructor() {}

  static getInstance(): EncryptionService {
    if (!this.instance) {
      this.instance = new EncryptionService();
    }
    return this.instance;
  }

  encryptData(data: any, key: string): string {
    const jsonStr = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonStr, key).toString();
  }

  decryptData(encryptedData: string, key: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedStr);
  }
}