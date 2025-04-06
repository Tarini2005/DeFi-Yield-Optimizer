import '@testing-library/jest-dom';

jest.mock('web3', () => {
  return jest.fn().mockImplementation(() => {
    return {
      eth: {
        Contract: jest.fn().mockImplementation(() => {
          return {
            methods: {
              balanceOf: jest.fn().mockReturnValue({
                call: jest.fn().mockResolvedValue('1000000000000000000')
              }),
              decimals: jest.fn().mockReturnValue({
                call: jest.fn().mockResolvedValue('18')
              }),
              symbol: jest.fn().mockReturnValue({
                call: jest.fn().mockResolvedValue('TEST')
              }),
              latestRoundData: jest.fn().mockReturnValue({
                call: jest.fn().mockResolvedValue({
                  roundId: '1',
                  answer: '200000000000',
                  startedAt: '1620000000',
                  updatedAt: '1620000000',
                  answeredInRound: '1'
                })
              })
            }
          };
        }),
        getGasPrice: jest.fn().mockResolvedValue('20000000000'),
        estimateGas: jest.fn().mockResolvedValue('21000'),
        getBalance: jest.fn().mockResolvedValue('1000000000000000000')
      },
      utils: {
        toWei: jest.fn().mockImplementation((value, unit) => {
          if (unit === 'ether' && value === '1') {
            return '1000000000000000000';
          }
          return '0';
        }),
        fromWei: jest.fn().mockImplementation((value, unit) => {
          if (unit === 'ether' && value === '1000000000000000000') {
            return '1';
          }
          return '0';
        })
      }
    };
  });
});

// Mock the window.ethereum object
Object.defineProperty(window, 'ethereum', {
  value: {
    isMetaMask: true,
    request: jest.fn().mockImplementation(async ({ method }) => {
      switch (method) {
        case 'eth_requestAccounts':
          return ['0x0000000000000000000000000000000000000000'];
        case 'eth_accounts':
          return ['0x0000000000000000000000000000000000000000'];
        case 'eth_chainId':
          return '0x1'; // Mainnet
        default:
          return null;
      }
    })
  },
  writable: true
});

// Mock fetch
global.fetch = jest.fn().mockImplementation((url) => {
  if (url.includes('api.coingecko.com')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        ethereum: {
          usd: 2000
        },
        bitcoin: {
          usd: 30000
        }
      })
    });
  }
  
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
  });
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverMock;

// Mock Chart.js to avoid canvas issues
jest.mock('chart.js', () => ({
  Chart: jest.fn(),
  registerables: [],
  register: jest.fn(),
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  PointElement: jest.fn(),
  LineElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
  BarElement: jest.fn()
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Bar: () => null
}));
