import { YieldData, ImpermanentLossResult, OptimalStrategy, RiskLevel } from '../utils/types';
import { fetchYieldData } from './dataService';

/**
 * Calculate impermanent loss for a liquidity position
 */
export const calculateImpermanentLoss = (
  token1Amount: number,
  token2Amount: number,
  priceChangeRatio: number // e.g., 0.5 for 50% price decrease, 2 for 100% price increase
): ImpermanentLossResult => {
  // Initial values
  const initialPrice = token2Amount / token1Amount;
  const initialValue = token1Amount * initialPrice + token2Amount;
  
  // Calculate constant product (k)
  const k = token1Amount * token2Amount;
  
  // New price after change
  const newPrice = initialPrice * (1 + priceChangeRatio);
  
  // Calculate new token amounts while maintaining constant product k
  const newToken1Amount = Math.sqrt(k / newPrice);
  const newToken2Amount = Math.sqrt(k * newPrice);
  
  // Value if held (not provided as LP)
  const holdValue = token1Amount * newPrice + token2Amount;
  
  // Value as LP
  const lpValue = newToken1Amount * newPrice + newToken2Amount;
  
  // Calculate impermanent loss
  const impermanentLoss = lpValue - holdValue;
  const impermanentLossPercent = (impermanentLoss / holdValue) * 100;
  
  return {
    token1InitialAmount: token1Amount,
    token2InitialAmount: token2Amount,
    token1NewAmount: newToken1Amount,
    token2NewAmount: newToken2Amount,
    initialPrice,
    newPrice,
    priceChangePercent: priceChangeRatio * 100,
    holdValue,
    lpValue,
    impermanentLoss,
    impermanentLossPercent: Math.abs(impermanentLossPercent)
  };
};

/**
 * Calculate optimal farming strategy based on user inputs
 */
export const calculateOptimalStrategy = async (
  protocolIds: string[],
  investmentAmount: number,
  timeHorizon: number,
  riskTolerance: RiskLevel
): Promise<OptimalStrategy> => {
  try {
    // Get yield data for the selected protocols
    const yieldData = await fetchYieldData(protocolIds);
    
    // Filter and rank opportunities based on risk tolerance
    const opportunities = rankOpportunities(yieldData, riskTolerance);
    
    // Calculate allocation based on the Modern Portfolio Theory (simplified)
    const allocations = calculateAllocations(opportunities, investmentAmount, riskTolerance);
    
    // Calculate expected return based on allocations
    const expectedReturn = allocations.reduce(
      (sum, allocation) => sum + (allocation.expectedApy * allocation.percentage) / 100,
      0
    );
    
    // Calculate projected value after the time horizon
    const projectedValue = investmentAmount * Math.pow(1 + expectedReturn / 100, timeHorizon / 12);
    
    // Generate strategy insights based on the allocations
    const insights = generateStrategyInsights(allocations, riskTolerance, timeHorizon);
    
    return {
      expectedReturn,
      riskLevel: riskTolerance,
      projectedValue,
      allocations,
      insights
    };
  } catch (error) {
    console.error('Error calculating optimal strategy:', error);
    throw new Error('Failed to calculate optimal strategy');
  }
};

/**
 * Rank yield opportunities based on risk tolerance
 */
const rankOpportunities = (
  yieldData: YieldData[],
  riskTolerance: RiskLevel
): YieldData[] => {
  // Define weights for APY and risk based on user's risk tolerance
  let apyWeight, riskWeight;
  
  switch (riskTolerance) {
    case 'low':
      apyWeight = 0.3;
      riskWeight = 0.7;
      break;
    case 'moderate':
      apyWeight = 0.5;
      riskWeight = 0.5;
      break;
    case 'high':
      apyWeight = 0.7;
      riskWeight = 0.3;
      break;
    case 'aggressive':
      apyWeight = 0.9;
      riskWeight = 0.1;
      break;
    default:
      apyWeight = 0.5;
      riskWeight = 0.5;
  }
  
  // Convert risk level string to numeric value
  const riskMap: Record<string, number> = {
    'very low': 1,
    'low': 2,
    'moderate': 3,
    'high': 4,
    'very high': 5
  };
  
  // Calculate score for each opportunity
  const scoredOpportunities = yieldData.map(opportunity => {
    const riskScore = riskMap[opportunity.riskLevel.toLowerCase()] || 3;
    const normalizedRiskScore = (5 - riskScore) / 4; // Invert so lower risk = higher score
    const normalizedApyScore = Math.min(opportunity.apy / 30, 1); // Cap at 30% APY
    
    const score = (apyWeight * normalizedApyScore + riskWeight * normalizedRiskScore);
    
    return {
      ...opportunity,
      score
    };
  });
  
  // Sort by score descending
  return scoredOpportunities.sort((a, b) => (b as any).score - (a as any).score);
};

/**
 * Calculate allocations based on ranked opportunities
 */
const calculateAllocations = (
  rankedOpportunities: YieldData[],
  investmentAmount: number,
  riskTolerance: RiskLevel
): Array<{
  protocolId: string;
  protocolName: string;
  assetName: string;
  percentage: number;
  expectedApy: number;
}> => {
  // Number of assets to include based on risk tolerance
  let numAssets;
  switch (riskTolerance) {
    case 'low':
      numAssets = Math.min(6, rankedOpportunities.length);
      break;
    case 'moderate':
      numAssets = Math.min(4, rankedOpportunities.length);
      break;
    case 'high':
      numAssets = Math.min(3, rankedOpportunities.length);
      break;
    case 'aggressive':
      numAssets = Math.min(2, rankedOpportunities.length);
      break;
    default:
      numAssets = Math.min(4, rankedOpportunities.length);
  }
  
  // Take top N assets
  const selectedOpportunities = rankedOpportunities.slice(0, numAssets);
  
  // Apply allocation strategy based on risk tolerance
  let allocations;
  
  switch (riskTolerance) {
    case 'low':
      // More balanced allocation for low risk
      allocations = equalWeight(selectedOpportunities);
      break;
    case 'moderate':
      // Mix of equal weight and score-based weight
      allocations = mixedWeight(selectedOpportunities);
      break;
    case 'high':
      // Higher weights toward higher scores
      allocations = scoreWeight(selectedOpportunities);
      break;
    case 'aggressive':
      // Concentrated allocation to highest yield opportunities
      allocations = concentratedWeight(selectedOpportunities);
      break;
    default:
      allocations = mixedWeight(selectedOpportunities);
  }
  
  return allocations;
};

/**
 * Equal weight allocation strategy
 */
const equalWeight = (opportunities: YieldData[]): any[] => {
  const percentage = 100 / opportunities.length;
  
  return opportunities.map(opportunity => ({
    protocolId: opportunity.protocolId,
    protocolName: opportunity.protocolName,
    assetName: opportunity.assetName,
    percentage,
    expectedApy: opportunity.apy
  }));
};

/**
 * Mixed weight allocation strategy (50% equal, 50% based on score)
 */
const mixedWeight = (opportunities: YieldData[]): any[] => {
  // Calculate total score
  const totalScore = opportunities.reduce((sum, opp) => sum + (opp as any).score, 0);
  
  // Base allocation (50% equal weight)
  const basePercentage = 50 / opportunities.length;
  
  // Remaining 50% allocated by score
  return opportunities.map(opportunity => {
    const scoreBasedPercentage = 50 * ((opportunity as any).score / totalScore);
    
    return {
      protocolId: opportunity.protocolId,
      protocolName: opportunity.protocolName,
      assetName: opportunity.assetName,
      percentage: basePercentage + scoreBasedPercentage,
      expectedApy: opportunity.apy
    };
  });
};

/**
 * Score-based weight allocation strategy
 */
const scoreWeight = (opportunities: YieldData[]): any[] => {
  // Calculate total score
  const totalScore = opportunities.reduce((sum, opp) => sum + (opp as any).score, 0);
  
  // Allocate based on score
  return opportunities.map(opportunity => ({
    protocolId: opportunity.protocolId,
    protocolName: opportunity.protocolName,
    assetName: opportunity.assetName,
    percentage: 100 * ((opportunity as any).score / totalScore),
    expectedApy: opportunity.apy
  }));
};

/**
 * Concentrated weight allocation strategy (highest yield gets more)
 */
const concentratedWeight = (opportunities: YieldData[]): any[] => {
  // Exponentially weight scores to concentrate on highest performers
  const exponentiatedScores = opportunities.map(opp => ({
    ...opp,
    expScore: Math.pow((opp as any).score, 2)
  }));
  
  // Calculate total exponential score
  const totalExpScore = exponentiatedScores.reduce((sum, opp) => sum + opp.expScore, 0);
  
  // Allocate based on exponential score
  return exponentiatedScores.map(opportunity => ({
    protocolId: opportunity.protocolId,
    protocolName: opportunity.protocolName,
    assetName: opportunity.assetName,
    percentage: 100 * (opportunity.expScore / totalExpScore),
    expectedApy: opportunity.apy
  }));
};

/**
 * Generate insights based on the calculated strategy
 */
const generateStrategyInsights = (
  allocations: any[],
  riskTolerance: RiskLevel,
  timeHorizon: number
): string => {
  let insights = '';
  
  // Get top allocation
  const topAllocation = allocations.sort((a, b) => b.percentage - a.percentage)[0];
  
  // Generate insights based on risk tolerance
  switch (riskTolerance) {
    case 'low':
      insights = `This conservative strategy prioritizes capital preservation by diversifying across ${allocations.length} assets. The largest allocation (${topAllocation.percentage.toFixed(1)}%) is to ${topAllocation.protocolName}'s ${topAllocation.assetName}, which offers a balance of stability and yield. This strategy aims to minimize exposure to protocol risk and market volatility over your ${timeHorizon}-month investment horizon.`;
      break;
    case 'moderate':
      insights = `This balanced strategy allocates capital across ${allocations.length} assets to provide a mix of yield and stability. With ${topAllocation.percentage.toFixed(1)}% allocated to ${topAllocation.protocolName}'s ${topAllocation.assetName}, the portfolio aims to capture yield opportunities while managing overall risk. This approach is well-suited for your ${timeHorizon}-month timeframe, offering potential for growth while maintaining reasonable security.`;
      break;
    case 'high':
      insights = `This growth-oriented strategy focuses on higher-yielding opportunities, with a significant ${topAllocation.percentage.toFixed(1)}% allocation to ${topAllocation.protocolName}'s ${topAllocation.assetName}. By concentrating investments across ${allocations.length} carefully selected assets, this approach aims to maximize returns over your ${timeHorizon}-month horizon. While this strategy entails higher risk, it's structured to capture yield efficiently in the current market conditions.`;
      break;
    case 'aggressive':
      insights = `This aggressive yield-maximizing strategy concentrates ${topAllocation.percentage.toFixed(1)}% of capital in ${topAllocation.protocolName}'s ${topAllocation.assetName}, which currently offers the most attractive risk-adjusted returns. With allocations to just ${allocations.length} high-performing assets, this approach prioritizes capturing the highest possible yields over your ${timeHorizon}-month timeframe. Note that this concentrated strategy carries higher risk of impermanent loss and protocol-specific risks.`;
      break;
    default:
      insights = `This strategy allocates across ${allocations.length} assets with ${topAllocation.percentage.toFixed(1)}% in ${topAllocation.protocolName}'s ${topAllocation.assetName}. It aims to balance risk and reward over your ${timeHorizon}-month investment horizon.`;
  }
  
  return insights;
};
