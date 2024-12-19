import { PatternMatch } from '../../../types/ai';

export const calculateContextualRisk = (
  match: PatternMatch, 
  baseRisk: number
): number => {
  const multiplier = calculateContextMultiplier(match);
  return Number((baseRisk * multiplier).toFixed(2));
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