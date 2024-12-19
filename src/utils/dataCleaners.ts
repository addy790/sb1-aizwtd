import { toast } from 'react-hot-toast';

export interface CleaningReport {
  field: string;
  originalValue: any;
  cleanedValue: any;
  operations: string[];
}

export const cleanData = (data: any): { cleaned: any; report: CleaningReport[] } => {
  if (!data) return { cleaned: data, report: [] };
  
  const report: CleaningReport[] = [];

  const cleanObject = (obj: any): any => {
    const cleaned: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) {
        report.push({
          field: key,
          originalValue: value,
          cleanedValue: undefined,
          operations: ['Removed null/undefined value']
        });
        continue;
      }

      if (typeof value === 'string') {
        const cleanedValue = cleanString(value);
        if (cleanedValue !== value) {
          report.push({
            field: key,
            originalValue: value,
            cleanedValue: cleanedValue,
            operations: detectStringOperations(value, cleanedValue)
          });
        }
        cleaned[key] = cleanedValue;
      }
      else if (typeof value === 'number') {
        const cleanedValue = cleanNumber(value);
        if (cleanedValue !== value) {
          report.push({
            field: key,
            originalValue: value,
            cleanedValue: cleanedValue,
            operations: detectNumberOperations(value, cleanedValue)
          });
        }
        cleaned[key] = cleanedValue;
      }
      else if (Array.isArray(value)) {
        const cleanedArray = value
          .map(item => typeof item === 'object' ? cleanObject(item) : item)
          .filter(item => item !== null && item !== undefined);
        
        if (cleanedArray.length !== value.length) {
          report.push({
            field: key,
            originalValue: value,
            cleanedValue: cleanedArray,
            operations: ['Filtered array elements']
          });
        }
        cleaned[key] = cleanedArray;
      }
      else if (typeof value === 'object') {
        cleaned[key] = cleanObject(value);
      }
      else {
        cleaned[key] = value;
      }
    }

    return cleaned;
  };

  const cleaned = cleanObject(data);
  return { cleaned, report };
};

const cleanString = (str: string): string => {
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/[<>]/g, '')
    .replace(/^\s+|\s+$/g, '');
};

const cleanNumber = (num: number): number => {
  if (!Number.isFinite(num)) return 0;
  return Number(num.toFixed(4));
};

const detectStringOperations = (original: string, cleaned: string): string[] => {
  const operations: string[] = [];
  
  if (original.trim() !== original) {
    operations.push('Removed leading/trailing whitespace');
  }
  if (original.match(/\s+/g) && original.match(/\s+/g)!.length > cleaned.match(/\s+/g)?.length) {
    operations.push('Normalized whitespace');
  }
  if (original.match(/[^\x20-\x7E]/)) {
    operations.push('Removed non-printable characters');
  }
  if (original.match(/[<>]/)) {
    operations.push('Removed HTML tags');
  }
  
  return operations;
};

const detectNumberOperations = (original: number, cleaned: number): string[] => {
  const operations: string[] = [];
  
  if (!Number.isFinite(original)) {
    operations.push('Converted invalid number to 0');
  } else if (original !== cleaned) {
    operations.push('Rounded to 4 decimal places');
  }
  
  return operations;
};