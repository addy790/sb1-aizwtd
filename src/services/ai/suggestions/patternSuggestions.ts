import { RiskLevel } from '../../../types/ai';

export const getPatternSuggestions = (pattern: string, risk: RiskLevel): string[] => {
  const suggestions: string[] = [];
  
  const patternSuggestions: Record<string, string[]> = {
    'credit_card': [
      'Use tokenization for credit card numbers',
      'Implement PCI DSS compliant storage',
      'Consider using a payment processor'
    ],
    'ssn': [
      'Apply strong encryption for SSNs',
      'Implement access controls',
      'Consider data minimization'
    ],
    // Add more pattern suggestions here
  };

  if (patternSuggestions[pattern]) {
    suggestions.push(...patternSuggestions[pattern]);
  }

  if (risk === 'critical' || risk === 'high') {
    suggestions.push(
      'Implement immediate data protection measures',
      'Review access permissions',
      'Consider data deletion if not necessary'
    );
  }

  return suggestions;
};