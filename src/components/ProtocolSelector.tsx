import React from 'react';
import { Protocol } from '../utils/types';

interface ProtocolSelectorProps {
  protocols: Protocol[];
  selectedProtocols: Protocol[];
  onToggleProtocol: (protocol: Protocol) => void;
}

const ProtocolSelector: React.FC<ProtocolSelectorProps> = ({ 
  protocols, 
  selectedProtocols, 
  onToggleProtocol 
}) => {
  return (
    <div className="card">
      <div className="card-title">Select DeFi Protocols to Compare</div>
      <div className="protocol-selector">
        {protocols.map(protocol => (
          <div 
            key={protocol.id}
            className={`protocol-card ${selectedProtocols.some(p => p.id === protocol.id) ? 'selected' : ''}`}
            onClick={() => onToggleProtocol(protocol)}
          >
            <img src={protocol.logoUrl} alt={protocol.name} />
            <span>{protocol.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolSelector;
