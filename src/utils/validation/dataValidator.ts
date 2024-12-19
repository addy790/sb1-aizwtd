export class DataValidator {
  static validateInput(data: any): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }
    
    try {
      JSON.stringify(data);
      return true;
    } catch {
      return false;
    }
  }

  static validateSensitiveFields(data: any, fields: string[]): string[] {
    const missingFields: string[] = [];
    
    fields.forEach(field => {
      if (!this.fieldExistsInObject(data, field)) {
        missingFields.push(field);
      }
    });
    
    return missingFields;
  }

  private static fieldExistsInObject(obj: any, field: string): boolean {
    for (const key in obj) {
      if (key === field) return true;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (this.fieldExistsInObject(obj[key], field)) return true;
      }
    }
    return false;
  }
}