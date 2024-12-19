export const calculateRemediationPriority = (
  riskScore: number,
  complianceFlagsCount: number,
  contextualRisk: number
): number => {
  const complianceImpact = complianceFlagsCount * 0.2;
  return Number(((riskScore + complianceImpact + contextualRisk) / 3).toFixed(2));
};