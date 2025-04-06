import React, { useState, useEffect } from 'react';
import { fetchYieldData } from '../services/dataService';
import { Protocol, YieldData, AssetType } from '../utils/types';

interface YieldComparisonProps {
  selectedProtocols: Protocol[];
}

const YieldComparison: React.FC<YieldComparisonProps> = ({ selectedProtocols }) => {
  const [yieldData, setYieldData] = useState<YieldData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [assetType, setAssetType] = useState<AssetType>('stablecoin');
  const [timeframe, setTimeframe] = useState<string>('7d');

  useEffect(() => {
    const loadYieldData = async () => {
      if (selectedProtocols.length === 0) {
        setYieldData([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchYieldData(
          selectedProtocols.map(p => p.id), 
          assetType, 
          timeframe
        );
        setYieldData(data);
      } catch (err) {
        setError('Failed to load yield data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadYieldData();
  }, [selectedProtocols, assetType, timeframe]);

  const getYieldClassName = (apy: number): string => {
    if (apy >= 15) return 'high';
    if (apy >= 5) return 'medium';
    return 'low';
  };

  return (
    <div className="card">
      <div className="card-title">Yield Comparison</div>
      
      <div className="form-group">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="asset-type">Asset Type</label>
            <select 
              id="asset-type" 
              value={assetType} 
              onChange={(e) => setAssetType(e.target.value as AssetType)}
            >
              <option value="stablecoin">Stablecoins</option>
              <option value="ethereum">Ethereum</option>
              <option value="bitcoin">Bitcoin</option>
              <option value="altcoin">Altcoins</option>
              <option value="lp-token">LP Tokens</option>
            </select>
          </div>
          
          <div style={{ flex: 1 }}>
            <label htmlFor="timeframe">Timeframe</label>
            <select 
              id="timeframe" 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
              <option value="1y">1 Year</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div>Loading yield data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : yieldData.length === 0 ? (
        <div>No yield data available. Please select at least one protocol.</div>
      ) : (
        <table className="yield-table">
          <thead>
            <tr>
              <th>Protocol</th>
              <th>Asset</th>
              <th>APY (%)</th>
              <th>TVL</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {yieldData.map((data, index) => (
              <tr key={index}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img 
                      src={selectedProtocols
