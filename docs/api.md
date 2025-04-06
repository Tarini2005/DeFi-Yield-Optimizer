# DeFi Yield Comparison Tool API Documentation

This document provides information about the available API endpoints and data formats used in the DeFi Yield Comparison Tool.

## Base URL

All API endpoints are relative to the base URL of the application. In development mode, this is typically:

```
http://localhost:3000/api
```

## Authentication

Currently, the API does not require authentication. However, rate limiting is applied to prevent abuse.

## API Endpoints

### Protocols

#### Get All Supported Protocols

Retrieves a list of all DeFi protocols supported by the tool.

```
GET /api/protocols
```

**Response:**

```json
[
  {
    "id": "aave",
    "name": "Aave",
    "logoUrl": "https://cryptologos.cc/logos/aave-aave-logo.png"
  },
  {
    "id": "compound",
    "name": "Compound",
    "logoUrl": "https://cryptologos.cc/logos/compound-comp-logo.png"
  },
  // ...more protocols
]
```

### Yields

#### Get Current Yields

Retrieves current yield data for specified protocols.

```
GET /api/yields
```

**Query Parameters:**

- `protocols` (required): Comma-separated list of protocol IDs
- `assetType` (optional): Filter by asset type (stablecoin, ethereum, bitcoin, altcoin, lp-token)
- `timeframe` (optional): Timeframe for yield calculation (7d, 30d, 90d, 1y)

**Response:**

```json
[
  {
    "protocolId": "aave",
    "protocolName": "Aave",
    "assetName": "USDC",
    "assetType": "stablecoin",
    "apy": 4.2,
    "tvl": 532000000,
    "riskLevel": "Low"
  },
  // ...more yield data
]
```

#### Get Historical Yields

Retrieves historical yield data for charts.

```
GET /api/historical-yields
```

**Query Parameters:**

- `protocols` (required): Comma-separated list of protocol IDs
- `timeframe` (optional): Time range (30d, 90d, 180d, 1y)
- `assetType` (optional): Filter by asset type

**Response:**

```json
[
  {
    "protocolId": "aave",
    "protocolName": "Aave",
    "data": [
      {
        "date": "2023-01-01",
        "yield": 4.2,
        "assetName": "USDC",
        "assetType": "stablecoin"
      },
      // ...more historical data points
    ]
  },
  // ...more protocols
]
```

#### Get Projected Returns

Retrieves projected return data for different market scenarios.

```
GET /api/projected-returns
```

**Query Parameters:**

- `protocols` (required): Comma-separated list of protocol IDs
- `scenario` (optional): Market scenario (base, bull, bear, volatile)
- `assetType` (optional): Filter by asset type

**Response:**

```json
[
  {
    "protocolId": "aave",
    "protocolName": "Aave",
    "assetName": "USDC",
    "assetType": "stablecoin",
    "scenario": "base",
    "currentApy": 4.2,
    "projections": {
      "month1": 4.3,
      "month3": 4.4,
      "month6": 4.5,
      "month12": 4.7
    }
  },
  // ...more projected returns
]
```

### Strategy Optimization

#### Calculate Optimal Strategy

Calculates an optimal strategy based on user inputs.

```
POST /api/optimal-strategy
```

**Request Body:**

```json
{
  "protocols": ["aave", "compound", "curve"],
  "investmentAmount": 10000,
  "timeHorizon": 12,
  "riskTolerance": "moderate"
}
```

**Response:**

```json
{
  "expectedReturn": 5.7,
  "riskLevel": "moderate",
  "projectedValue": 10570,
  "allocations": [
    {
      "protocolId": "aave",
      "protocolName": "Aave",
      "assetName": "USDC",
      "percentage": 40,
      "expectedApy": 4.2
    },
    // ...more allocations
  ],
  "insights": "This balanced strategy allocates capital across 3 assets to provide a mix of yield and stability..."
}
```

## Data Models

### Protocol

```typescript
interface Protocol {
  id: string;
  name: string;
  logoUrl: string;
}
```

### YieldData

```typescript
interface YieldData {
  protocolId: string;
  protocolName: string;
  assetName: string;
  assetType: string;
  apy: number;
  tvl: number;
  riskLevel: string;
}
```

### HistoricalYield

```typescript
interface HistoricalYield {
  protocolId: string;
  protocolName: string;
  data: {
    date: string;
    yield: number;
    assetName: string;
    assetType: string;
  }[];
}
```

### ProjectedReturn

```typescript
interface ProjectedReturn {
  protocolId: string;
  protocolName: string;
  assetName: string;
  assetType: string;
  scenario: string;
  currentApy: number;
  projections: {
    month1: number;
    month3: number;
    month6: number;
    month12: number;
  };
}
```

### OptimalStrategy

```typescript
interface OptimalStrategy {
  expectedReturn: number;
  riskLevel: string;
  projectedValue: number;
  allocations: Array<{
    protocolId: string;
    protocolName: string;
    assetName: string;
    percentage: number;
    expectedApy: number;
  }>;
  insights: string;
}
```

## Error Handling

The API follows standard HTTP status codes:

- `200 OK`: Request was successful
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

Error responses have the following format:

```json
{
  "error": "Description of the error"
}
```

## Rate Limiting

API requests are limited to 60 requests per minute per IP address. When the rate limit is exceeded, the API will respond with status code `429 Too Many Requests`.

## Caching

Responses are cached for 5 minutes to improve performance. The `Cache-Control` header in the response indicates the cache duration.
