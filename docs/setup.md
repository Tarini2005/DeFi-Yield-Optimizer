# DeFi Yield Comparison Tool - Setup Guide

This guide will help you set up and run the DeFi Yield Comparison Tool on your local machine or server.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [Git](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/defi-yield-tool.git
cd defi-yield-tool
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configuration

Create a `.env` file in the root directory based on the `.env.example` file:

```bash
cp .env.example .env
```

Edit the `.env` file and add your API keys and configuration:

```
# API Keys for DeFi Protocols
INFURA_API_KEY=your_infura_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key

# Network Configuration
NETWORK=mainnet
RPC_URL=https://mainnet.infura.io/v3/your_infura_api_key

# Protocol-specific API Keys
AAVE_API_KEY=your_aave_api_key
COMPOUND_API_KEY=your_compound_api_key

# Configuration
CACHE_DURATION=3600
MAX_REQUESTS_PER_MINUTE=60
```

### 4. Development Mode

To run the application in development mode:

```bash
npm run dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### 5. Production Build

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

To serve the production build:

```bash
npm install -g serve
serve -s dist
```

## Architecture

### Frontend

The frontend is built with:

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Chart.js**: Data visualization
- **Web3.js**: Blockchain interactions

### Backend (API)

The backend API endpoints are implemented in:

- `src/api/routes.ts`: API routes
- `src/services/`: Service implementations

## Connecting to DeFi Protocols

The tool connects to various DeFi protocols to fetch real-time yield data. This is done through:

1. **Direct RPC Calls**: Using Web3.js to interact with smart contracts
2. **Protocol-specific APIs**: Using protocol-provided APIs
3. **Data Aggregators**: Using data from aggregator services

### Smart Contract Interactions

Examples of smart contract interactions are in `src/utils/web3Utils.ts`.

### Adding New Protocols

To add a new protocol:

1. Add protocol information to `src/utils/constants.ts`:

```typescript
protocols: [
  // ... existing protocols
  { id: 'new-protocol', name: 'New Protocol', logoUrl: 'https://example.com/logo.png' }
]
```

2. Add API endpoint (if available) to `PROTOCOL_APIS`:

```typescript
PROTOCOL_APIS: {
  // ... existing APIs
  'new-protocol': 'https://api.new-protocol.com'
}
```

3. Add yield data to the services or implement a new fetcher in `src/services/protocolService.ts`.

## Testing

### Running Tests

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

### Writing Tests

Tests are located in the `tests/` directory:

- `tests/unit/`: Unit tests
- `tests/integration/`: Integration tests

## Troubleshooting

### Common Issues

#### Cannot connect to RPC provider

Check your `.env` file and ensure the `RPC_URL` is correct and that your API key is valid.

#### API rate limits exceeded

If you're hitting rate limits, adjust the `MAX_REQUESTS_PER_MINUTE` setting and implement additional caching.

#### Missing data for a protocol

Verify that the protocol's API is working or check if there are any changes to their API endpoints or response format.

### Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

## Further Customization

### Styling

The application uses CSS for styling. The main stylesheet is located at `src/styles.css`.

### Adding Features

To add new features:

1. Create new components in `src/components/`
2. Add new API endpoints in `src/api/routes.ts` if needed
3. Implement new services in `src/services/`
4. Update the UI to include the new features

## Deployment

### Deployment Options

The application can be deployed to:

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Server Environments**: AWS, Google Cloud, Azure
- **Docker**: Containerized deployment

### Docker Deployment

To deploy using Docker:

1. Build the Docker image:

```bash
docker build -t defi-yield-tool .
```

2. Run the container:

```bash
docker run -p 80:80 defi-yield-tool
```

### CI/CD Integration

The repository includes a basic GitHub Actions workflow for CI/CD in `.github/workflows/main.yml`.

This automatically tests, builds, and optionally deploys the application when changes are pushed to the main branch.
