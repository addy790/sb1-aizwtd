import { v4 as uuidv4 } from 'uuid';
import { DataPattern, RiskLevel, PatternMatch, DataField } from '../../types/ai';
import { sensitivePatterns, riskScores } from './patterns/patternDefinitions';
import { calculateRiskLevel, calculateImpactScore } from './utils/riskCalculator';
import { getComplianceFlags } from './utils/complianceMapper';

export class PatternAnalysisService {
  private static instance: PatternAnalysisService;
  private patterns: Map<string, RegExp>;
  private riskScores: Map<string, number>;

  private constructor() {
    this.patterns = sensitivePatterns;
    this.riskScores = riskScores;
  }

  static getInstance(): PatternAnalysisService {
    if (!PatternAnalysisService.instance) {
      PatternAnalysisService.instance = new PatternAnalysisService();
    }
    return PatternAnalysisService.instance;
  }

  analyzeData(data: any): PatternMatch[] {
    const matches: PatternMatch[] = [];
    this.traverseObject(data, '', matches);
    return this.enrichMatches(matches);
  }

  private traverseObject(obj: any, path: string, matches: PatternMatch[]): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof value === 'string') {
        this.detectPatterns(currentPath, value, matches);
      } else if (typeof value === 'object' && value !== null) {
        this.traverseObject(value, currentPath, matches);
      }
    }
  }

  private detectPatterns(field: string, value: string, matches: PatternMatch[]): void {
    for (const [patternName, regex] of this.patterns.entries()) {
      if (regex.test(value)) {
        matches.push(this.createMatch(field, patternName, value));
      }
    }
  }

  private createMatch(field: string, pattern: string, value: string): PatternMatch {
    const riskScore = this.riskScores.get(pattern) || 0.5;
    const riskLevel = calculateRiskLevel(riskScore);

    return {
      id: uuidv4(),
      field,
      pattern,
      confidence: riskScore,
      riskLevel,
      suggestions: this.generateSuggestions(pattern, riskLevel),
      dataType: this.inferDataType(pattern),
      impactScore: calculateImpactScore(pattern, riskLevel),
      complianceFlags: getComplianceFlags(pattern),
      detectionTimestamp: new Date().toISOString(),
    };
  }

  private generateSuggestions(pattern: string, risk: RiskLevel): string[] {
    const suggestions: string[] = [];
    
    switch (pattern) {
      case 'credit_card':
        suggestions.push(
          'Use tokenization for credit card numbers',
          'Implement PCI DSS compliant storage',
          'Consider using a payment processor'
        );
        break;
      case 'ssn':
        suggestions.push(
          'Apply strong encryption for SSNs',
          'Implement access controls',
          'Consider data minimization'
        );
        break;
      // Add more pattern-specific suggestions
    }

    if (risk === 'critical' || risk === 'high') {
      suggestions.push(
        'Implement immediate data protection measures',
        'Review access permissions',
        'Consider data deletion if not necessary'
      );
    }

    return suggestions;
  }

  private inferDataType(pattern: string): string {
    const dataTypes: Record<string, string> = {
      'credit_card': 'PAYMENT_INFO',
      'ssn': 'GOVERNMENT_ID',
      'email': 'CONTACT_INFO',
      'phone': 'CONTACT_INFO',
      'address': 'LOCATION_DATA',
      'date_of_birth': 'PERSONAL_INFO',
      'api_key': 'SECURITY_CREDENTIAL',
      'password_hash': 'SECURITY_CREDENTIAL',
      'ip_address': 'NETWORK_DATA',
      'jwt_token': 'SECURITY_CREDENTIAL',
      'blockchain_address': 'FINANCIAL_DATA',
      'medical_record': 'HEALTH_DATA',
      'bank_account': 'FINANCIAL_DATA',
      'passport_number': 'GOVERNMENT_ID',
      'device_id': 'DEVICE_INFO',
    };

    return dataTypes[pattern] || 'UNKNOWN';
  }

  private enrichMatches(matches: PatternMatch[]): PatternMatch[] {
    return matches.map(match => ({
      ...match,
      contextualRisk: this.analyzeContextualRisk(match),
      remediationPriority: this.calculateRemediationPriority(match),
    }));
  }

  private analyzeContextualRisk(match: PatternMatch): number {
    const baseRisk = this.riskScores.get(match.pattern) || 0.5;
    const contextMultiplier = this.calculateContextMultiplier(match);
    return Number((baseRisk * contextMultiplier).toFixed(2));
  }

  private calculateContextMultiplier(match: PatternMatch): number {
    let multiplier = 1.0;

    if (match.field.toLowerCase().includes('secure') || 
        match.field.toLowerCase().includes('private')) {
      multiplier *= 1.2;
    }

    if (match.dataType === 'SECURITY_CREDENTIAL' || 
        match.dataType === 'GOVERNMENT_ID') {
      multiplier *= 1.3;
    }

    multiplier *= (1 + (match.complianceFlags.length * 0.1));

    return Number(multiplier.toFixed(2));
  }

  private calculateRemediationPriority(match: PatternMatch): number {
    const riskScore = this.riskScores.get(match.pattern) || 0.5;
    const complianceImpact = match.complianceFlags.length * 0.2;
    const contextualImpact = match.contextualRisk || 0;

    return Number(((riskScore + complianceImpact + contextualImpact) / 3).toFixed(2));
  }
}