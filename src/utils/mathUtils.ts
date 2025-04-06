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
 * @param riskFreeRate - Annual risk-free rate
