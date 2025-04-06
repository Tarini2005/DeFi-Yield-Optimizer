import axios from 'axios';
import Web3 from 'web3';
import { Protocol, YieldData, HistoricalYield, ProjectedReturn } from '../utils/types';
import { PROTOCOL_APIS, MOCK_DATA } from '../utils/constants';

const web3 = new Web3(process.env.RPC_URL || 'https://mainnet.infura.io/v3/your-infura-key');


export const getProtocols = async (): Promise<Protocol[]> => {
  return MOCK_DATA.protocols;
};


export const getYields = async (
  protocolIds: string[],
  assetType: string = 'stablecoin',
  timeframe: string = '7d'
): Promise<YieldData[]> => {
  try {

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

export const getProjectedReturns = async (
  protocolIds: string[],
  scenario: string = 'base',
  assetType: string = 'stablecoin'
): Promise<ProjectedReturn[]> => {
  try {

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
