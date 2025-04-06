import axios from 'axios';
import Web3 from 'web3';
import { Protocol, YieldData, HistoricalYield, ProjectedReturn } from '../utils/types';
import { PROTOCOL_APIS, MOCK_DATA } from '../utils/constants';

// Initialize Web3 with provider from .env
const web3 = new Web3(process.env.RPC_URL || 'https://mainnet.infura.io/v3/your-infura-key');

/**
 * Fetch all supported protocols
 */
export const getProtocols = async (): Promise<Protocol[]> => {
  // In production, this would fetch from an API or database
  // For now, return mock data
  return MOCK_DATA.protocols;
};

/**
 * Fetch current yield data for specified protocols
 */
export const getYields = async (
  protocolIds: string[],
  assetType: string = 'stablecoin',
  timeframe: string = '7d'
): Promise<YieldData[]> => {
  try {
    // For production, these would be API calls to various DeFi protocols
    // For now, filter mock data
    const yieldData = MOCK_DATA.yields.filter(yield => 
      protocolIds.includes(yield.protocolId) && 
      yield.assetType === assetType
    );
    
    return yieldData;
  } catch (error) {
    console.error('Error fetching yield data:', error);
    throw new Error('Failed to fetch yield data');
  }
};

/**
 * Fetch historical yield data for charts
 */
export const getHistoricalYields = async (
  protocolIds: string[],
  timeframe: string = '90d',
  assetType: string = 'stablecoin'
): Promise<HistoricalYield[]> => {
  try {
    // Filter mock historical data
    const historicalData = MOCK_DATA.historicalYields
      .filter(data => protocolIds.includes(data.protocolId))
      .map(data => {
        // Filter data points by timeframe and asset type
        return {
          ...data,
          data: data.data.filter(point => 
            point.assetType === assetType && 
            isWithinTimeframe(point.date, timeframe)
          )
        };
      });
    
    return historicalData;
  } catch (error) {
    console.error('Error fetching historical yield data:', error);
    throw new Error('Failed to fetch historical yield data');
  }
};

/**
 * Fetch projected return data for different scenarios
 */
export const getProjectedReturns = async (
  protocolIds: string[],
  scenario: string = 'base',
  assetType: string = 'stablecoin'
): Promise<ProjectedReturn[]> => {
  try {
    // Filter mock projection data
    const projectionData = MOCK_DATA.projectedReturns
      .filter(data => 
        protocolIds.includes(data.protocolId) && 
        data.scenario === scenario && 
        data.assetType === assetType
      );
    
    return projectionData;
  } catch (error) {
    console.error('Error fetching projected return data:', error);
    throw new Error('Failed to fetch projected return data');
  }
};

/**
 * Helper function to check if a date string is within the specified timeframe
 */
const isWithinTimeframe = (dateStr: string, timeframe: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();
  
  switch (timeframe) {
    case '30d':
      return date >= new Date(now.setDate(now.getDate() - 30));
    case '90d':
      return date >= new Date(now.setDate(now.getDate() - 90));
    case '180d':
      return date >= new Date(now.setDate(now.getDate() - 180));
    case '1y':
      return date >= new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      return true;
  }
};
