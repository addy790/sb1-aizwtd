export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DataPattern {
  name: string;
  regex: RegExp;
  riskScore: number;
  category: string;
  description: string;
}

export interface PatternMatch {
  id: string;
  field: string;
  pattern: string;
  confidence: number;
  riskLevel: RiskLevel;
  suggestions: string[];
  dataType: string;
  impactScore: number;
  complianceFlags: string[];
  detectionTimestamp: string;
  contextualRisk?: number;
  remediationPriority?: number;
}

export interface DataField {
  name: string;
  value: any;
  path: string;
  type: string;
  sensitivity: number;
}