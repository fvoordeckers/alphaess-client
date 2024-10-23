# AlphaESS Cloud TypeScript Client

A strongly-typed TypeScript client for the Alpha ESS Open API. This client enables you to interact with your Alpha ESS inverter, solar panels, and battery system, providing real-time data and control capabilities.

## Installation

```bash
npm install alphaess-client
# or
yarn add alphaess-client
```

## Getting Started

### 1. Sign up at Alpha ESS Cloud
1. Register for a free account at [Alpha ESS Open Platform](https://open.alphaess.com/)
2. After registration, you'll receive your:
   - Developer ID (AppID)
   - Developer Secret (AppSecret)

### 2. Add Your Devices
1. Log in to [Alpha ESS Open Platform](https://open.alphaess.com/)
2. Navigate to Development Management > My System Information
3. Click "Add" to register your devices with your developer account

### 3. Basic Usage

```typescript
import { AlphaESS } from 'alphaess-client';

// Initialize the client
const client = new AlphaESS({
  appID: 'your-app-id',
  appSecret: 'your-app-secret',
  timeout: 30000 // optional, defaults to 30 seconds
});

// Get list of systems
const systems = await client.getESSList();

// Get real-time power data
const powerData = await client.getLastPowerData('your-system-serial');

// Get all data for all systems
const allData = await client.getAllData(true);
```

## ⚠️ Important Notes

- **Rate Limiting**: Frequent polling is not recommended. Maintain a minimum interval of 10-15 minutes between requests to avoid potential API limitations.
- **Error Handling**: All methods return `null` if the API request fails or returns invalid data.
- **Authentication**: Your AppID and AppSecret are used to generate secure request signatures. Keep these credentials secure.

## API Documentation

For detailed information about available endpoints and their responses, visit the [Alpha ESS Developer Portal](https://open.alphaess.com/developmentManagement/apiList).


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

