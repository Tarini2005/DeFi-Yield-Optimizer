import express from 'express';
import { 
  getProtocols, 
  getYields, 
  getHistoricalYields, 
  getProjectedReturns 
} from '../services/protocolService';
import { calculateOptimalStrategy } from '../services/calculationService';
import { RiskLevel } from '../utils/types';

const router = express.Router();

// Get all supported protocols
router.get('/protocols', async (req, res) => {
  try {
    const protocols = await getProtocols();
    res.json(protocols);
  } catch (error) {
    console.error('Error fetching protocols:', error);
    res.status(500).json({ error: 'Failed to fetch protocols' });
  }
});

// Get current yields
router.get('/yields', async (req, res) => {
  try {
    const { protocols, assetType, timeframe } = req.query;
    
    if (!protocols) {
      return res.status(400).json({ error: 'Protocols parameter is required' });
    }
    
    const protocolIds = (protocols as string).split(',');
    const yields = await getYields(
      protocolIds, 
      (assetType as string) || 'stablecoin', 
      (timeframe as string) || '7d'
    );
    
    res.json(yields);
  } catch (error) {
    console.error('Error fetching yields:', error);
    res.status(500).json({ error: 'Failed to fetch yield data' });
  }
});

// Get historical yields
router.get('/historical-yields', async (req, res) => {
  try {
    const { protocols, timeframe, assetType } = req.query;
    
    if (!protocols) {
      return res.status(400).json({ error: 'Protocols parameter is required' });
    }
    
    const protocolIds = (protocols as string).split(',');
    const historicalYields = await getHistoricalYields(
      protocolIds, 
      (timeframe as string) || '90d', 
      (assetType as string) || 'stablecoin'
    );
    
    res.json(historicalYields);
  } catch (error) {
    console.error('Error fetching historical yields:', error);
    res.status(500).json({ error: 'Failed to fetch historical yield data' });
  }
});

// Get projected returns
router.get('/projected-returns', async (req, res) => {
  try {
    const { protocols, scenario, assetType } = req.query;
    
    if (!protocols) {
      return res.status(400).json({ error: 'Protocols parameter is required' });
    }
    
    const protocolIds = (protocols as string).split(',');
    const projectedReturns = await getProjectedReturns(
      protocolIds, 
      (scenario as string) || 'base', 
      (assetType as string) || 'stablecoin'
    );
    
    res.json(projectedReturns);
  } catch (error) {
    console.error('Error fetching projected returns:', error);
    res.status(500).json({ error: 'Failed to fetch projected return data' });
  }
});

// Calculate optimal strategy
router.post('/optimal-strategy', async (req, res) => {
  try {
    const { protocols, investmentAmount, timeHorizon, riskTolerance } = req.body;
    
    if (!protocols || !investmentAmount || !timeHorizon || !riskTolerance) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const strategy = await calculateOptimalStrategy(
      protocols, 
      Number(investmentAmount), 
      Number(timeHorizon), 
      riskTolerance as RiskLevel
    );
    
    res.json(strategy);
  } catch (error) {
    console.error('Error calculating optimal strategy:', error);
    res.status(500).json({ error: 'Failed to calculate optimal strategy' });
  }
});

export default router;
