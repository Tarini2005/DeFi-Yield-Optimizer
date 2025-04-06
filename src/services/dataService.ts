import axios from 'axios';
import { YieldData, HistoricalYield, ProjectedReturn, AssetType } from '../utils/types';

const API_BASE_URL = '/api';


export const fetchYieldData = async (
  protocolIds: string[],
  assetType: AssetType = 'stablecoin',
  timeframe: string = '7d'
): Promise<YieldData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/yields`, {
      params: {
        protocols: protocolIds.join(','),
        assetType,
        timeframe
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching yield data:', error);
    throw new Error('Failed to fetch yield data');
  }
};

export const fetchHistoricalYields = async (
  protocolIds: string[],
  timeframe: string = '90d',
  assetType: string = 'stablecoin'
): Promise<HistoricalYield[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/historical-yields`, {
      params: {
        protocols: protocolIds.join(','),
        timeframe,
        assetType
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching historical yield data:', error);
    throw new Error('Failed to fetch historical yield data');
  }
};


export const fetchProjectedReturns = async (
  protocolIds: string[],
  scenario: string = 'base',
  assetType: string = 'stablecoin'
): Promise<ProjectedReturn[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projected-returns`, {
      params: {
        protocols: protocolIds.join(','),
        scenario,
        assetType
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching projected return data:', error);
    throw new Error('Failed to fetch projected return data');
  }
};
