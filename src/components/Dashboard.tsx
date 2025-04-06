import React, { useState } from 'react';
import YieldComparison from './YieldComparison';
import ImpermanentLossCalculator from './ImpermanentLossCalculator';
import StrategyOptimizer from './StrategyOptimizer';
import Visualizations from './Visualizations';
import { Protocol } from '../utils/types';

interface DashboardProps {
  selectedProtocols: Protocol[];
}

const Dashboard: React.FC<DashboardProps> = ({ selectedProtocols }) => {
  const [activeTab, setActiveTab] = useState('yield-comparison');
  
  const tabs = [
    { id: 'yield-comparison', label: 'Yield Comparison' },
    { id: 'impermanent-loss', label: 'Impermanent Loss' },
    { id: 'strategy-optimizer', label: 'Strategy Optimizer' },
    { id: 'visualizations', label: 'Visualizations' }
  ];

  return (
    <div className="dashboard">
      <div className="tabs">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      
      <div className="tab-content">
        {activeTab === 'yield-comparison' && (
          <YieldComparison selectedProtocols={selectedProtocols} />
        )}
        
        {activeTab === 'impermanent-loss' && (
          <ImpermanentLossCalculator />
        )}
        
        {activeTab === 'strategy-optimizer' && (
          <StrategyOptimizer selectedProtocols={selectedProtocols} />
        )}
        
        {activeTab === 'visualizations' && (
          <Visualizations selectedProtocols={selectedProtocols} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
