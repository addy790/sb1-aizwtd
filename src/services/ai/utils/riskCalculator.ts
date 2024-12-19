import { RiskLevel, PatternMatch } from '../../../types/ai';
import { riskScores } from '../patterns/patternDefinitions';

export const calculateRiskLevel = (score: number): RiskLevel => {
  if (score >= 0.9) return 'critical';
  if (score >= 0.7) return 'high';
  if (score >= 0.4) return 'medium';
  return 'low';
};

export const calculateImpactScore = (pattern: string, risk: RiskLevel): number => {
  const baseScore = riskScores.get(pattern) || 0.5;
  const riskMultiplier = {
    'critical': 1.0,
    'high': 0.8,
    'medium': 0.6,
    'low': 0.4,
  }[risk];

  return Number((baseScore * (riskMultiplier || 0.5)).toFixed(2));
};

export const calculateContextualRisk = (match: PatternMatch): number => {
  const baseRisk = riskScores.get(match.pattern) || 0.5;
  const contextMultiplier = calculateContextMultiplier(match);
  return Number((baseRisk * contextMultiplier).toFixed(2));
};

const calculateContextMultiplier = (match: PatternMatch): number => {
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
};