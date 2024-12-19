export const getComplianceFlags = (pattern: string): string[] => {
  const complianceMap: Record<string, string[]> = {
    'credit_card': ['PCI DSS', 'GDPR'],
    'ssn': ['HIPAA', 'GDPR'],
    'email': ['GDPR', 'CCPA'],
    'phone': ['GDPR', 'CCPA'],
    'address': ['GDPR', 'CCPA'],
    'date_of_birth': ['GDPR', 'CCPA'],
    'medical_record': ['HIPAA', 'GDPR'],
    'bank_account': ['GLBA', 'GDPR'],
    'passport_number': ['GDPR', 'CCPA'],
  };

  return complianceMap[pattern] || [];
};