# DeFi Yield Comparison Tool - Usage Guide

This guide explains how to use the DeFi Yield Comparison Tool to analyze yields across different protocols, calculate impermanent loss risks, and optimize farming strategies.

## Getting Started

Once you have the application running, you'll be presented with the main dashboard. The tool consists of four main sections:

1. **Protocol Selector**: Choose which DeFi protocols to compare
2. **Yield Comparison**: Compare current yields across selected protocols
3. **Impermanent Loss Calculator**: Calculate potential impermanent loss for liquidity positions
4. **Strategy Optimizer**: Find optimal yield farming strategies based on your preferences
5. **Visualizations**: View historical yield data and projected returns

## Protocol Selector

The Protocol Selector allows you to choose which DeFi protocols to include in your analysis.

![Protocol Selector](https://example.com/images/protocol-selector.png)

- Click on a protocol card to select or deselect it
- Selected protocols will be highlighted
- The dashboard will update automatically to show data for selected protocols only

## Yield Comparison

The Yield Comparison tab displays current yields across the selected protocols.

![Yield Comparison](https://example.com/images/yield-comparison.png)

### Filtering Options

1. **Asset Type**: Filter by asset type
   - Stablecoins: USDC, DAI, USDT, etc.
   - Ethereum: ETH and ETH derivatives
   - Bitcoin: BTC and BTC derivatives
   - Altcoins: Other cryptocurrencies
   - LP Tokens: Liquidity provider tokens

2. **Timeframe**: Choose the period for yield calculation
   - 7 Days
   - 30 Days
   - 90 Days
   - 1 Year

### Yield Table

The table shows the following information for each asset:

- **Protocol**: The DeFi protocol name and logo
- **Asset**: The specific asset or pool
- **APY (%)**: Annual Percentage Yield
- **TVL**: Total Value Locked in the protocol
- **Risk Level**: Estimated risk level (Very Low, Low, Moderate, High, Very High)

The APY values are color-coded:
- Green: High yield (≥15%)
- Yellow: Medium yield (≥5% and <15%)
- Red: Low yield (<5%)

## Impermanent Loss Calculator

The Impermanent Loss Calculator helps you estimate potential impermanent loss for liquidity positions when providing liquidity to AMMs (Automated Market Makers).

![Impermanent Loss Calculator](https://example.com/images/il-calculator.png)

### How to Use

1. Enter the details of your liquidity position:
   - Token 1: Symbol of the first token (e.g., ETH)
   - Amount: Amount of the first token
   - Token 2: Symbol of the second token (e.g., USDC)
   - Amount: Amount of the second token

2. Adjust the price change slider to simulate different price change scenarios

3. Click "Calculate Impermanent Loss" to see the results

### Understanding the Results

The calculator will show:

- **Impermanent Loss**: The percentage loss compared to holding
- **Hold Value**: The value if you had held the tokens instead of providing liquidity
- **LP Value**: The value of your liquidity position after the price change
- **Difference**: The absolute difference between holding and providing liquidity

The chart visualizes impermanent loss across different price change scenarios.

## Strategy Optimizer

The Strategy Optimizer helps you find the optimal allocation of funds across different protocols based on your investment parameters.

![Strategy Optimizer](https://example.com/images/strategy-optimizer.png)

### Input Parameters

1. **Investment Amount**: The total amount you want to invest (in USD)
2. **Time Horizon**: Your investment timeframe (in months)
3. **Risk Tolerance**: Your risk preference
   - Low: Capital preservation focus
   - Moderate: Balanced approach
   - High: Growth-oriented
   - Aggressive: Maximum yield focus

### Optimization Results

After clicking "Calculate Optimal Strategy", you'll see:

- **Expected Annual Return**: Projected annual yield
- **Risk Level**: Overall risk assessment of the strategy
- **Projected Value**: Estimated value after your specified time horizon

The allocation table shows the recommended distribution of funds:

- **Protocol**: DeFi protocol name
- **Asset**: Specific asset or pool
- **Allocation (%)**: Percentage of your investment
- **Amount ($)**: Dollar amount to invest
- **Expected APY (%)**: Projected annual yield

The "Strategy Insights" section provides a summary and explanation of the recommended strategy.

## Visualizations

The Visualizations tab provides graphical representations of historical yields and projected returns.

![Visualizations](https://example.com/images/visualizations.png)

### Chart Types

1. **Historical Yields**: Line chart showing yield changes over time
   - Adjust the timeframe (30 Days, 90 Days, 180 Days, 1 Year)
   - Filter by asset type

2. **Projected Returns**: Bar chart showing projected future returns
   - Choose market scenario (Base Case, Bull Market, Bear Market, High Volatility)
   - Filter by asset type

The charts are interactive:
- Hover over data points for detailed information
- Click on legend items to show/hide specific protocols
- Use the toolbar in the top-right to download, zoom, or reset the chart

## Advanced Usage

### Comparing Strategies

To compare different strategies:

1. Use the Strategy Optimizer with different parameters
2. Take note of the allocations and expected returns
3. Use the Impermanent Loss Calculator to assess risks for LP positions

### Risk Assessment

When evaluating yields, consider:

1. **Protocol Risk**: Risk of smart contract vulnerabilities or exploits
2. **Asset Risk**: Volatility and market risk of the underlying assets
3. **Impermanent Loss Risk**: For liquidity provider positions
4. **Counterparty Risk**: Reliance on centralized components

### Optimal Rebalancing

For long-term yield farming:

1. Monitor changes in APYs across protocols regularly
2. Run the Strategy Optimizer periodically to adjust your strategy
3. Consider transaction costs when rebalancing (gas fees on Ethereum)

## Tips and Best Practices

1. **Diversification**: Spread investments across multiple protocols to reduce risk
2. **Risk vs. Reward**: Higher yields typically come with higher risks
3. **Gas Costs**: Consider Ethereum gas fees when deploying or moving funds
4. **Protocol Features**: Some protocols offer additional incentives (governance tokens)
5. **Tax Implications**: Keep records of all transactions for tax purposes

## Troubleshooting

### Common Issues

- **Data Not Loading**: Check your internet connection, refresh the page
- **Incorrect Calculations**: Verify input parameters, ensure protocols are selected
- **Chart Display Issues**: Try a different browser, clear cache
