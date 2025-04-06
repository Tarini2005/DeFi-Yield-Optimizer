import { Protocol, YieldData, HistoricalYield, ProjectedReturn } from './types';

// API endpoints for DeFi protocols
export const PROTOCOL_APIS = {
  aave: 'https://aave-api.com',
  compound: 'https://api.compound.finance',
  uniswap: 'https://api.uniswap.org',
  curve: 'https://api.curve.fi',
  yearn: 'https://api.yearn.finance',
  sushiswap: 'https://api.sushi.com',
  balancer: 'https://api.balancer.fi',
  convex: 'https://api.convex.finance',
  maker: 'https://api.makerdao.com',
  anchor: 'https://api.anchorprotocol.com'
};

// Mock data for development and testing
export const MOCK_DATA = {
  // Protocol data
  protocols: [
    { id: 'aave', name: 'Aave', logoUrl: 'https://cryptologos.cc/logos/aave-aave-logo.png' },
    { id: 'compound', name: 'Compound', logoUrl: 'https://cryptologos.cc/logos/compound-comp-logo.png' },
    { id: 'uniswap', name: 'Uniswap', logoUrl: 'https://cryptologos.cc/logos/uniswap-uni-logo.png' },
    { id: 'curve', name: 'Curve', logoUrl: 'https://cryptologos.cc/logos/curve-dao-token-crv-logo.png' },
    { id: 'yearn', name: 'Yearn Finance', logoUrl: 'https://cryptologos.cc/logos/yearn-finance-yfi-logo.png' },
    { id: 'sushiswap', name: 'SushiSwap', logoUrl: 'https://cryptologos.cc/logos/sushiswap-sushi-logo.png' },
    { id: 'balancer', name: 'Balancer', logoUrl: 'https://cryptologos.cc/logos/balancer-bal-logo.png' },
    { id: 'convex', name: 'Convex Finance', logoUrl: 'https://cryptologos.cc/logos/convex-finance-cvx-logo.png' }
  ] as Protocol[],
  
  // Yield data
  yields: [
    // Stablecoins
    { protocolId: 'aave', protocolName: 'Aave', assetName: 'USDC', assetType: 'stablecoin', apy: 4.2, tvl: 532000000, riskLevel: 'Low' },
    { protocolId: 'compound', protocolName: 'Compound', assetName: 'USDC', assetType: 'stablecoin', apy: 3.9, tvl: 487000000, riskLevel: 'Low' },
    { protocolId: 'aave', protocolName: 'Aave', assetName: 'DAI', assetType: 'stablecoin', apy: 4.1, tvl: 498000000, riskLevel: 'Low' },
    { protocolId: 'compound', protocolName: 'Compound', assetName: 'DAI', assetType: 'stablecoin', apy: 3.8, tvl: 423000000, riskLevel: 'Low' },
    { protocolId: 'curve', protocolName: 'Curve', assetName: '3pool', assetType: 'stablecoin', apy: 5.3, tvl: 732000000, riskLevel: 'Low' },
    { protocolId: 'yearn', protocolName: 'Yearn Finance', assetName: 'USDC Vault', assetType: 'stablecoin', apy: 7.2, tvl: 356000000, riskLevel: 'Moderate' },
    { protocolId: 'convex', protocolName: 'Convex Finance', assetName: '3pool', assetType: 'stablecoin', apy: 8.4, tvl: 412000000, riskLevel: 'Moderate' },
    
    // Ethereum
    { protocolId: 'aave', protocolName: 'Aave', assetName: 'ETH', assetType: 'ethereum', apy: 2.1, tvl: 843000000, riskLevel: 'Moderate' },
    { protocolId: 'compound', protocolName: 'Compound', assetName: 'ETH', assetType: 'ethereum', apy: 1.9, tvl: 678000000, riskLevel: 'Moderate' },
    { protocolId: 'yearn', protocolName: 'Yearn Finance', assetName: 'ETH Vault', assetType: 'ethereum', apy: 5.7, tvl: 289000000, riskLevel: 'High' },
    { protocolId: 'curve', protocolName: 'Curve', assetName: 'stETH/ETH', assetType: 'ethereum', apy: 3.8, tvl: 432000000, riskLevel: 'Moderate' },
    
    // Bitcoin
    { protocolId: 'aave', protocolName: 'Aave', assetName: 'WBTC', assetType: 'bitcoin', apy: 1.8, tvl: 321000000, riskLevel: 'Moderate' },
    { protocolId: 'compound', protocolName: 'Compound', assetName: 'WBTC', assetType: 'bitcoin', apy: 1.6, tvl: 287000000, riskLevel: 'Moderate' },
    { protocolId: 'yearn', protocolName: 'Yearn Finance', assetName: 'WBTC Vault', assetType: 'bitcoin', apy: 4.9, tvl: 198000000, riskLevel: 'High' },
    { protocolId: 'curve', protocolName: 'Curve', assetName: 'renBTC/WBTC', assetType: 'bitcoin', apy: 3.2, tvl: 267000000, riskLevel: 'Moderate' },
    
    // Altcoins
    { protocolId: 'aave', protocolName: 'Aave', assetName: 'AAVE', assetType: 'altcoin', apy: 6.4, tvl: 156000000, riskLevel: 'High' },
    { protocolId: 'aave', protocolName: 'Aave', assetName: 'LINK', assetType: 'altcoin', apy: 3.7, tvl: 134000000, riskLevel: 'High' },
    { protocolId: 'compound', protocolName: 'Compound', assetName: 'COMP', assetType: 'altcoin', apy: 7.8, tvl: 98000000, riskLevel: 'High' },
    { protocolId: 'yearn', protocolName: 'Yearn Finance', assetName: 'YFI Vault', assetType: 'altcoin', apy: 9.3, tvl: 76000000, riskLevel: 'Very High' },
    
    // LP Tokens
    { protocolId: 'uniswap', protocolName: 'Uniswap', assetName: 'ETH/USDC', assetType: 'lp-token', apy: 15.2, tvl: 245000000, riskLevel: 'High' },
    { protocolId: 'uniswap', protocolName: 'Uniswap', assetName: 'ETH/WBTC', assetType: 'lp-token', apy: 12.7, tvl: 187000000, riskLevel: 'High' },
    { protocolId: 'sushiswap', protocolName: 'SushiSwap', assetName: 'ETH/USDT', assetType: 'lp-token', apy: 17.8, tvl: 156000000, riskLevel: 'High' },
    { protocolId: 'sushiswap', protocolName: 'SushiSwap', assetName: 'WBTC/ETH', assetType: 'lp-token', apy: 14.3, tvl: 143000000, riskLevel: 'High' },
    { protocolId: 'balancer', protocolName: 'Balancer', assetName: 'BAL/ETH', assetType: 'lp-token', apy: 21.5, tvl: 87000000, riskLevel: 'Very High' },
    { protocolId: 'balancer', protocolName: 'Balancer', assetName: '80/20 USDC/WETH', assetType: 'lp-token', apy: 11.2, tvl: 112000000, riskLevel: 'Moderate' }
  ] as YieldData[],
  
  // Historical yield data
  historicalYields: [
    {
      protocolId: 'aave',
      protocolName: 'Aave',
      data: generateHistoricalData('USDC', 'stablecoin', 4.2, 0.3)
    },
    {
      protocolId: 'compound',
      protocolName: 'Compound',
      data: generateHistoricalData('USDC', 'stablecoin', 3.9, 0.25)
    },
    {
      protocolId: 'curve',
      protocolName: 'Curve',
      data: generateHistoricalData('3pool', 'stablecoin', 5.3, 0.4)
    },
    {
      protocolId: 'yearn',
      protocolName: 'Yearn Finance',
      data: generateHistoricalData('USDC Vault', 'stablecoin', 7.2, 0.6)
    },
    {
      protocolId: 'uniswap',
      protocolName: 'Uniswap',
      data: generateHistoricalData('ETH/USDC', 'lp-token', 15.2, 1.8)
    },
    {
      protocolId: 'sushiswap',
      protocolName: 'SushiSwap',
      data: generateHistoricalData('ETH/USDT', 'lp-token', 17.8, 2.1)
    },
    {
      protocolId: 'balancer',
      protocolName: 'Balancer',
      data: generateHistoricalData('BAL/ETH', 'lp-token', 21.5, 3.2)
    },
    {
      protocolId: 'convex',
      protocolName: 'Convex Finance',
      data: generateHistoricalData('3pool', 'stablecoin', 8.4, 0.7)
    }
  ] as HistoricalYield[],
  
  // Projected returns
  projectedReturns: [
    // Base case scenario
    {
      protocolId: 'aave',
      protocolName: 'Aave',
      assetName: 'USDC',
      assetType: 'stablecoin',
      scenario: 'base',
      currentApy: 4.2,
      projections: { month1: 4.3, month3: 4.4, month6: 4.5, month12: 4.7 }
    },
    {
      protocolId: 'compound',
      protocolName: 'Compound',
      assetName: 'USDC',
      assetType: 'stablecoin',
      scenario: 'base',
      currentApy: 3.9,
      projections: { month1: 4.0, month3: 4.1, month6: 4.2, month12: 4.4 }
    },
    {
      protocolId: 'curve',
      protocolName: 'Curve',
      assetName: '3pool',
      assetType: 'stablecoin',
      scenario: 'base',
      currentApy: 5.3,
      projections: { month1: 5.4, month3: 5.5, month6: 5.6, month12: 5.8 }
    },
    {
      protocolId: 'yearn',
      protocolName: 'Yearn Finance',
      assetName: 'USDC Vault',
      assetType: 'stablecoin',
      scenario: 'base',
      currentApy: 7.2,
      projections: { month1: 7.3, month3: 7.4, month6: 7.5, month12: 7.7 }
    },
    
    // Bull market scenario
    {
      protocolId: 'aave',
      protocolName: 'Aave',
      assetName: 'USDC',
      assetType: 'stablecoin',
      scenario: 'bull',
      currentApy: 4.2,
      projections: { month1: 4.5, month3: 5.0, month6: 5.5, month12: 6.0 }
    },
    {
      protocolId: 'compound',
      protocolName: 'Compound',
      assetName: 'USDC',
      assetType: 'stablecoin',
      scenario: 'bull',
      currentApy: 3.9,
      projections: { month1: 4.2, month3: 4.7, month6: 5.2, month12: 5.7 }
    },
    {
      protocolId: 'curve',
      protocolName: 'Curve',
      assetName: '3pool',
      assetType: 'stablecoin',
      scenario: 'bull',
      currentApy: 5.3,
      projections: { month1: 5.8, month3: 6.5, month6: 7.2, month12: 8.0 }
    },
    {
      protocolId: 'yearn',
      protocolName: 'Yearn Finance',
      assetName: 'USDC Vault',
      assetType: 'stablecoin',
      scenario: 'bull',
      currentApy: 7.2,
      projections: { month1: 7.8, month3: 8.5, month6: 9.2, month12: 10.0 }
    },
    
    // Bear market scenario
    {
      protocolId: 'aave',
      protocolName: 'Aave',
      assetName: 'USDC',
      assetType: 'stablecoin',
      scenario: 'bear',
      currentApy: 4.2,
      projections: { month1: 4.0, month3: 3.8, month6: 3.5, month12: 3.2 }
    },
    {
      protocolId: 'compound',
      protocolName: 'Compound',
      assetName: 'USDC',
      assetType: 'stablecoin',
      scenario: 'bear',
      currentApy: 3.9,
      projections: { month1: 3.7, month3: 3.5, month6: 3.2, month12: 2.9 }
    },
    {
      protocolId: 'curve',
      protocolName: 'Curve',
      assetName: '3pool',
      assetType: 'stablecoin',
      scenario: 'bear',
      currentApy: 5.3,
      projections: { month1: 5.0, month3: 4.7, month6: 4.3, month12: 4.0 }
    },
    {
      protocolId: 'yearn',
      protocolName: 'Yearn Finance',
      assetName: 'USDC Vault',
      assetType: 'stablecoin',
      scenario: 'bear',
      currentApy: 7.2,
      projections: { month1: 6.8, month3: 6.4, month6: 6.0, month12: 5.5 }
    },
    
    // High volatility scenario
    {
      protocolId: 'aave',
      protocolName: 'Aave',
      assetName: 'USDC',
      assetType: 'stablecoin',
      scenario: 'volatile',
      currentApy: 4.2,
      projections: { month1: 3.8, month3: 4.5, month6: 3.9, month12: 4.7 }
    },
    {
      protocolId: 'compound',
      protocolName: 'Compound',
      assetName: 'USDC',
      assetType: 'stablecoin',
      scenario: 'volatile',
      currentApy: 3.9,
      projections: { month1: 3.5, month3: 4.2, month6: 3.6, month12: 4.3 }
    },
    {
      protocolId: 'curve',
      protocolName: 'Curve',
      assetName: '3pool',
      assetType: 'stablecoin',
      scenario: 'volatile',
      currentApy: 5.3,
      projections: { month1: 4.8, month3: 5.8, month6: 5.0, month12: 6.0 }
    },
    {
      protocolId: 'yearn',
      protocolName: 'Yearn Finance',
      assetName: 'USDC Vault',
      assetType: 'stablecoin',
      scenario: 'volatile',
      currentApy: 7.2,
      projections: { month1: 6.5, month3: 7.8, month6: 6.8, month12: 8.0 }
    }
  ] as ProjectedReturn[]
};

// Helper function to generate 365 days
