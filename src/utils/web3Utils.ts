import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// Initialize Web3 with provider from .env
const web3 = new Web3(process.env.RPC_URL || 'https://mainnet.infura.io/v3/your-infura-key');

// Common ABI fragments for DeFi protocols
const ERC20_ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

/**
 * Get token balance for a given address
 */
export const getTokenBalance = async (
  tokenAddress: string,
  walletAddress: string
): Promise<string> => {
  try {
    const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(walletAddress).call();
    const decimals = await tokenContract.methods.decimals().call();
    
    // Convert to human-readable format
    return (Number(balance) / Math.pow(10, Number(decimals))).toString();
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw new Error('Failed to get token balance');
  }
};

/**
 * Get current ETH/USD price from ChainLink Oracle
 */
export const getEthPrice = async (): Promise<number> => {
  try {
    // ChainLink ETH/USD price feed address on Ethereum mainnet
    const chainlinkAddress = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
    const chainlinkABI: AbiItem[] = [
      {
        inputs: [],
        name: 'latestRoundData',
        outputs: [
          { name: 'roundId', type: 'uint80' },
          { name: 'answer', type: 'int256' },
          { name: 'startedAt', type: 'uint256' },
          { name: 'updatedAt', type: 'uint256' },
          { name: 'answeredInRound', type: 'uint80' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ];
    
    const priceContract = new web3.eth.Contract(chainlinkABI, chainlinkAddress);
    const roundData = await priceContract.methods.latestRoundData().call();
    
    // ChainLink price feeds have 8 decimals
    return Number(roundData.answer) / 1e8;
  } catch (error) {
    console.error('Error getting ETH price:', error);
    throw new Error('Failed to get ETH price');
  }
};

/**
 * Get token price in USD from DEX (Uniswap)
 */
export const getTokenPrice = async (tokenAddress: string): Promise<number> => {
  try {
    // For a production application, this would query Uniswap or other DEX API
    // Here we'll simulate it with a mock implementation
    
    // Common token addresses for testing
    const mockPrices: Record<string, number> = {
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 1.00, // USDC
      '0xdAC17F958D2ee523a2206206994597C13D831ec7': 1.00, // USDT
      '0x6B175474E89094C44Da98b954EedeAC495271d0F': 1.00, // DAI
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': 30000.00, // WBTC
    };
    
    if (mockPrices[tokenAddress]) {
      return mockPrices[tokenAddress];
    }
    
    // Fallback to ETH price for unknown tokens (for demo purposes)
    const ethPrice = await getEthPrice();
    return ethPrice * 0.01; // Arbitrary price for demonstration
  } catch (error) {
    console.error('Error getting token price:', error);
    throw new Error('Failed to get token price');
  }
};

/**
 * Estimate gas cost for a transaction
 */
export const estimateGasCost = async (
  fromAddress: string,
  toAddress: string,
  data: string = '0x'
): Promise<string> => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await web3.eth.estimateGas({
      from: fromAddress,
      to: toAddress,
      data,
    });
    
    // Convert to a human-readable format (ETH)
    const gasCostWei = BigInt(gasPrice) * BigInt(gasEstimate);
    const gasCostEth = Number(gasCostWei) / 1e18;
    
    return gasCostEth.toString();
  } catch (error) {
    console.error('Error estimating gas cost:', error);
    throw new Error('Failed to estimate gas cost');
  }
};
