import { v4 as uuidv4 } from 'uuid';

export interface PatternMatch {
  id: string;
  field: string;
  pattern: string;
  confidence: number;
  suggestion: string;
  risk: 'low' | 'medium' | 'high';
}

export class PatternRecognitionService {
  private static instance: PatternRecognitionService;
  private patterns: Map<string, RegExp>;
  
  private constructor() {
    this.patterns = new Map([
      ['credit_card', /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/],
      ['ssn', /\b\d{3}-?\d{2}-?\d{4}\b/],
      ['email_pattern', /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/],
      ['ip_address', /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/],
      ['phone_number', /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/],
      ['date_of_birth', /\b\d{2}[-/]\d{2}[-/]\d{4}\b/],
      ['address', /\b\d+\s+([A-Za-z]+\s*)+,\s*[A-Za-z]+,\s*[A-Z]{2}\s*\d{5}\b/],
      ['api_key', /([a-zA-Z0-9]{32}|[a-zA-Z0-9-_]{64})/],
      ['password', /password[:=]\s*['"][^'"]+['"]|pwd[:=]\s*['"][^'"]+['"]|pass[:=]\s*['"][^'"]+['"]]/],
      ['authentication_token', /auth.*token.*[:=]\s*['"][^'"]+['"]|bearer.*[:=]\s*['"][^'"]+['"]]/i],
    ]);
  }

  static getInstance(): PatternRecognitionService {
    if (!this.instance) {
      this.instance = new PatternRecognitionService();
    }
    return this.instance;
  }

  analyzeData(data: any): PatternMatch[] {
    const matches: PatternMatch[] = [];
    this.traverseObject(data, '', matches);
    return matches;
  }

  private traverseObject(obj: any, path: string, matches: PatternMatch[]): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof value === 'string') {
        this.checkPatterns(currentPath, value, matches);
      } else if (typeof value === 'object' && value !== null) {
        this.traverseObject(value, currentPath, matches);
      }
    }
  }

  private checkPatterns(field: string, value: string, matches: PatternMatch[]): void {
    for (const [patternName, regex] of this.patterns.entries()) {
      if (regex.test(value)) {
        matches.push(this.createMatch(field, patternName, value));
      }
    }
  }

  private createMatch(field: string, pattern: string, value: string): PatternMatch {
    const riskLevels: Record<string, 'low' | 'medium' | 'high'> = {
      'credit_card': 'high',
      'ssn': 'high',
      'password': 'high',
      'authentication_token': 'high',
      'api_key': 'high',
      'email_pattern': 'medium',
      'phone_number': 'medium',
      'date_of_birth': 'medium',
      'address': 'medium',
      'ip_address': 'low'
    };

    const suggestions: Record<string, string> = {
      'credit_card': 'Use tokenization for credit card numbers',
      'ssn': 'Apply strong encryption for SSNs',
      'password': 'Never store passwords in plaintext, use secure hashing',
      'authentication_token': 'Rotate tokens regularly and store securely',
      'api_key': 'Use environment variables for API keys',
      'email_pattern': 'Consider email address anonymization',
      'phone_number': 'Mask or encrypt phone numbers',
      'date_of_birth': 'Consider age ranges instead of exact dates',
      'address': 'Use geographic regions instead of exact addresses',
      'ip_address': 'Consider IP anonymization techniques'
    };

    return {
      id: uuidv4(),
      field,
      pattern,
      confidence: this.calculateConfidence(value, pattern),
      suggestion: suggestions[pattern] || 'Consider data protection measures',
      risk: riskLevels[pattern] || 'medium'
    };
  }

  private calculateConfidence(value: string, pattern: string): number {
    // Simple confidence calculation based on pattern complexity
    const complexityFactors = {
      'credit_card': 0.9,
      'ssn': 0.95,
      'password': 0.85,
      'authentication_token': 0.9,
      'api_key': 0.8,
      'email_pattern': 0.7,
      'phone_number': 0.75,
      'date_of_birth': 0.8,
      'address': 0.6,
      'ip_address': 0.7
    };

    return complexityFactors[pattern as keyof typeof complexityFactors] || 0.5;
  }
}