import { DataPattern } from '../../../types/ai';

export const sensitivePatterns: Map<string, RegExp> = new Map([
  ['credit_card', /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/],
  ['ssn', /\b\d{3}-?\d{2}-?\d{4}\b/],
  ['email', /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/],
  ['phone', /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/],
  ['address', /\b\d+\s+([A-Za-z]+\s*)+,\s*[A-Za-z]+,\s*[A-Z]{2}\s*\d{5}\b/],
  ['date_of_birth', /\b\d{2}[-/]\d{2}[-/]\d{4}\b/],
  ['api_key', /([a-zA-Z0-9]{32}|[a-zA-Z0-9-_]{64})/],
  ['password_hash', /\b[a-f0-9]{32}\b|\b[a-f0-9]{40}\b|\b[a-f0-9]{64}\b/],
  ['ip_address', /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/],
  ['jwt_token', /eyJ[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+/],
  ['blockchain_address', /\b(0x)?[a-fA-F0-9]{40}\b/],
  ['medical_record', /\b(MRN|PHR)[-: ]?\d{6,10}\b/i],
  ['bank_account', /\b\d{8,12}\b/],
  ['passport_number', /\b[A-Z]\d{7}\b/],
  ['device_id', /\b([A-F0-9]{2}:){5}[A-F0-9]{2}\b/],
]);

export const riskScores: Map<string, number> = new Map([
  ['credit_card', 0.95],
  ['ssn', 0.98],
  ['email', 0.75],
  ['phone', 0.80],
  ['address', 0.85],
  ['date_of_birth', 0.70],
  ['api_key', 0.90],
  ['password_hash', 0.95],
  ['ip_address', 0.60],
  ['jwt_token', 0.92],
  ['blockchain_address', 0.88],
  ['medical_record', 0.94],
  ['bank_account', 0.93],
  ['passport_number', 0.96],
  ['device_id', 0.65],
]);