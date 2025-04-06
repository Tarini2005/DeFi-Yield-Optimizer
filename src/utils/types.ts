// Protocol information
export interface Protocol {
  id: string;
  name: string;
  logoUrl: string;
}

// Asset types
export type AssetType = 'stablecoin' | 'ethereum' | 'bitcoin' | 'altcoin' | 'lp-token';

// Risk levels
export type RiskLevel = 'low' | 'moderate' | 'high' | 'aggressive';

// Yield data structure
export interface YieldData {
  protocolId: string;
  protocolName: string;
  assetName: string;
  assetType: string;
  apy: number;
  tvl: number;
  riskLevel: string;
}

// Historical yield data structure
export interface HistoricalYield {
  protocolId: string;
  protocolName: string;
  data: {
    date: string;
    yield: number;
    assetName: string;
    assetType: string;
  }[];
}

// Projected return data structure
export interface ProjectedReturn {
  protocolId: string;
  protocolName: string;
  assetName: string;
  assetType: string;
  scenario: string;
  currentApy: number;
  projections: {
    month1: number;
    month3: number;
    month6: number;
    month12: number;
  };
}

// Impermanent loss calculation result
export interface ImpermanentLossResult {
  token1InitialAmount: number;
  token2InitialAmount: number;
  token1NewAmount: number;
  token2NewAmount: number;
  initialPrice: number;
  newPrice: number;
  priceChangePercent: number;
  holdValue: number;
  lpValue: number;
  impermanentLoss: number;
  impermanentLossPercent: number;
}

// Optimal strategy interface
export interface OptimalStrategy {
  expectedReturn: number;
  riskLevel: RiskLevel;
  projectedValue: number;
  allocations: Array<{
    protocolId: string;
    protocolName: string;
    assetName: string;
    percentage: number;
    expectedApy: number;
  }>;
  insights: string;
}

// Token interface
export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  price: number;
}

// LP Token position
export interface LPPosition {
  pairAddress: string;
  token0: Token;
  token1: Token;
  reserveAmount0: number;
  reserveAmount1: number;
  totalSupply: number;
  userLPTokens: number;
}
