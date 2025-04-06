import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ProtocolSelector from './components/ProtocolSelector';
import { fetchSupportedProtocols } from './services/protocolService';
import { Protocol } from './utils/types';

const App: React.FC = () => {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [selectedProtocols, setSelectedProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProtocols = async () => {
      try {
        setLoading(true);
        const supportedProtocols = await fetchSupportedProtocols();
        setProtocols(supportedProtocols);
        // Select first three protocols by default
        setSelectedProtocols(supportedProtocols.slice(0, 3));
      } catch (err) {
        setError('Failed to load DeFi protocols. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProtocols();
  }, []);

  const handleProtocolToggle = (protocol: Protocol) => {
    if (selectedProtocols.some(p => p.id === protocol.id)) {
      setSelectedProtocols(selectedProtocols.filter(p => p.id !== protocol.id));
    } else {
      setSelectedProtocols([...selectedProtocols, protocol]);
    }
  };

  if (loading) {
    return <div className="loading">Loading DeFi protocols...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>DeFi Yield Comparison Tool</h1>
      </header>
      <main>
        <ProtocolSelector 
          protocols={protocols}
          selectedProtocols={selectedProtocols}
          onToggleProtocol={handleProtocolToggle}
        />
        <Dashboard selectedProtocols={selectedProtocols} />
      </main>
      <footer className="app-footer">
        <p>Data is provided for informational purposes only. Always do your own research.</p>
      </footer>
    </div>
  );
};

export default App;
