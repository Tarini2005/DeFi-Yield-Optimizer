import React, { useState } from 'react';
import { calculateImpermanentLoss } from '../services/calculationService';
import { ImpermanentLossResult } from '../utils/types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ImpermanentLossCalculator: React.FC = () => {
  const [token1Amount, setToken1Amount] = useState<number>(1);
  const [token2Amount, setToken2Amount] = useState<number>(100);
  const [token1Name, setToken1Name] = useState<string>('ETH');
  const [token2Name, setToken2Name] = useState<string>('USDC');
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0);
  const [results, setResults] = useState<ImpermanentLossResult | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const handleCalculate = () => {
    // Calculate impermanent loss at different price change levels for the chart
    const priceChanges = [-90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const ilResults = priceChanges.map(change => {
      const result = calculateImpermanentLoss(token1Amount, token2Amount, change / 100);
      return {
        priceChange: change,
        impermanentLoss: result.impermanentLossPercent
      };
    });

    // Set chart data
    setChartData({
      labels: priceChanges.map(change => `${change}%`),
      datasets: [
        {
          label: 'Impermanent Loss (%)',
          data: ilResults.map(r => r.impermanentLoss),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });

    // Calculate the specific result based on user input
    const result = calculateImpermanentLoss(token1Amount, token2Amount, priceChangePercent / 100);
    setResults(result);
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Impermanent Loss vs. Price Change',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="card">
      <div className="card-title">Impermanent Loss Calculator</div>
      
      <div className="form-group">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="token1-name">Token 1</label>
            <input 
              id="token1-name" 
              type="text" 
              value={token1Name} 
              onChange={(e) => setToken1Name(e.target.value)}
              placeholder="Token symbol (e.g. ETH)"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="token1-amount">Amount</label>
            <input 
              id="token1-amount" 
              type="number" 
              value={token1Amount} 
              onChange={(e) => setToken1Amount(Number(e.target.value))}
              min="0.0001"
              step="0.01"
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="token2-name">Token 2</label>
            <input 
              id="token2-name" 
              type="text" 
              value={token2Name} 
              onChange={(e) => setToken2Name(e.target.value)}
              placeholder="Token symbol (e.g. USDC)"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="token2-amount">Amount</label>
            <input 
              id="token2-amount" 
              type="number" 
              value={token2Amount} 
              onChange={(e) => setToken2Amount(Number(e.target.value))}
              min="0.0001"
              step="0.01"
            />
          </div>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="price-change">Price Change (%)</label>
          <input 
            id="price-change" 
            type="range" 
            min="-90" 
            max="500" 
            step="5" 
            value={priceChangePercent} 
            onChange={(e) => setPriceChangePercent(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>-90%</span>
            <span>{priceChangePercent}%</span>
            <span>+500%</span>
          </div>
        </div>
        
        <button onClick={handleCalculate}>Calculate Impermanent Loss</button>
      </div>
      
      {results && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Results</h3>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <strong>Impermanent Loss:</strong>
              <span className={results.impermanentLossPercent < 1 ? 'low' : results.impermanentLossPercent < 5 ? 'medium' : 'high'}>
                {results.impermanentLossPercent.toFixed(2)}%
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <strong>Hold Value:</strong>
              <span>${results.holdValue.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <strong>LP Value:</strong>
              <span>${results.lpValue.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <strong>Difference:</strong>
              <span>${(results.holdValue - results.lpValue).toFixed(2)}</span>
            </div>
          </div>
          
          {chartData && (
            <div className="chart-container">
              <Line options={chartOptions} data={chartData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImpermanentLossCalculator;
