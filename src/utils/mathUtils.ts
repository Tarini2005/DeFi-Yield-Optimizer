/**
 * Calculate the annualized percentage yield (APY) from an annual percentage rate (APR)
 * APY = (1 + APR/n)^n - 1, where n is the number of compounding periods
 */
export const aprToApy = (apr: number, compoundingPeriods: number = 365): number => {
  return Math.pow(1 + apr / 100 / compoundingPeriods, compoundingPeriods) - 1;
};

/**
 * Calculate the annual percentage rate (APR) from an annualized percentage yield (APY)
 * APR = n * ((1 + APY)^(1/n) - 1), where n is the number of compounding periods
 */
export const apyToApr = (apy: number, compoundingPeriods: number = 365): number => {
  return compoundingPeriods * (Math.pow(1 + apy / 100, 1 / compoundingPeriods) - 1) * 100;
};

/**
 * Calculate the future value of an investment with periodic additions
 * @param principal - Initial investment amount
 * @param monthlyContribution - Additional monthly contribution
 * @param annualRate - Annual interest rate (as a percentage)
 * @param years - Investment duration in years
 * @param compoundingFrequency - Number of times interest compounds per year (default: 12)
 */
export const calculateFutureValue = (
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number = 12
): number => {
  const periodicRate = annualRate / 100 / compoundingFrequency;
  const periods = compoundingFrequency * years;
  
  // Future value of principal
  const principalFV = principal * Math.pow(1 + periodicRate, periods);
  
  // Future value of periodic contributions
  const contributionFV = monthlyContribution * ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);
  
  return principalFV + contributionFV;
};

/**
 * Calculate the Sharpe ratio for a portfolio or strategy
 * (Return - Risk-Free Rate) / Standard Deviation
 * @param expectedReturn - Expected annual return (percentage)
 * @param riskFreeRate - Annual risk-free rate (percentage)
 * @param volatility - Annual volatility / standard deviation (percentage)
 */
export const calculateSharpeRatio = (
  expectedReturn: number,
  riskFreeRate: number = 1.5, // Current T-bill rate as default
  volatility: number
): number => {
  if (volatility === 0) return 0;
  return (expectedReturn - riskFreeRate) / volatility;
};

/**
 * Calculate the Sortino ratio (similar to Sharpe but only considers downside volatility)
 * @param expectedReturn - Expected annual return (percentage)
 * @param riskFreeRate - Annual risk-free rate (percentage)
 * @param downsideDeviation - Downside deviation (percentage)
 */
export const calculateSortinoRatio = (
  expectedReturn: number,
  riskFreeRate: number = 1.5,
  downsideDeviation: number
): number => {
  if (downsideDeviation === 0) return 0;
  return (expectedReturn - riskFreeRate) / downsideDeviation;
};

/**
 * Calculate weighted average of values
 * @param values - Array of values
 * @param weights - Array of weights (should sum to 1)
 */
export const weightedAverage = (values: number[], weights: number[]): number => {
  if (values.length !== weights.length) {
    throw new Error('Values and weights arrays must have the same length');
  }
  
  // Normalize weights to sum to 1
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  const normalizedWeights = weights.map(weight => weight / sumWeights);
  
  return values.reduce((sum, value, index) => sum + value * normalizedWeights[index], 0);
};

/**
 * Calculate the standard deviation of a set of values
 * @param values - Array of values
 */
export const standardDeviation = (values: number[]): number => {
  const n = values.length;
  
  if (n < 2) return 0;
  
  const mean = values.reduce((sum, value) => sum + value, 0) / n;
  const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
  const variance = squaredDiffs.reduce((sum, value) => sum + value, 0) / (n - 1);
  
  return Math.sqrt(variance);
};

/**
 * Calculate correlation coefficient between two sets of values
 * @param valuesX - First array of values
 * @param valuesY - Second array of values
 */
export const correlation = (valuesX: number[], valuesY: number[]): number => {
  if (valuesX.length !== valuesY.length) {
    throw new Error('Both arrays must have the same length');
  }
  
  const n = valuesX.length;
  
  if (n < 2) return 0;
  
  // Calculate means
  const meanX = valuesX.reduce((sum, value) => sum + value, 0) / n;
  const meanY = valuesY.reduce((sum, value) => sum + value, 0) / n;
  
  // Calculate covariance and variances
  let covariance = 0;
  let varianceX = 0;
  let varianceY = 0;
  
  for (let i = 0; i < n; i++) {
    const diffX = valuesX[i] - meanX;
    const diffY = valuesY[i] - meanY;
    
    covariance += diffX * diffY;
    varianceX += diffX * diffX;
    varianceY += diffY * diffY;
  }
  
  covariance /= n - 1;
  varianceX /= n - 1;
  varianceY /= n - 1;
  
  if (varianceX === 0 || varianceY === 0) return 0;
  
  return covariance / (Math.sqrt(varianceX) * Math.sqrt(varianceY));
};
