import { ReactNode, useEffect } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { registerEnokiWallets } from '@mysten/enoki';

// Create a query client for dapp-kit
const queryClient = new QueryClient();

// Get configuration from environment variables
const network = (import.meta.env.VITE_SUI_NETWORK || 'testnet') as 'testnet' | 'mainnet' | 'devnet';
const enokiApiKey = import.meta.env.VITE_ENOKI_API_KEY;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Initialize Sui client
const suiClient = new SuiClient({
  url: getFullnodeUrl(network),
});

// Register Enoki wallets once on module load
if (enokiApiKey && googleClientId) {
  registerEnokiWallets({
    client: suiClient,
    network,
    apiKey: enokiApiKey,
    providers: {
      google: {
        clientId: googleClientId,
      },
    },
  });
} else {
  if (!enokiApiKey) {
    console.warn('VITE_ENOKI_API_KEY is not set. Enoki authentication will not work.');
  }
  if (!googleClientId) {
    console.warn('VITE_GOOGLE_CLIENT_ID is not set. Google login will not work.');
  }
}

interface EnokiProviderProps {
  children: ReactNode;
}

export function EnokiProvider({ children }: EnokiProviderProps) {
  // Debug: Log network configuration
  console.log('EnokiProvider: Configuring with network:', network);
  console.log('EnokiProvider: SuiClient URL:', getFullnodeUrl(network));

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider 
        networks={{
          testnet: { url: getFullnodeUrl('testnet') },
          mainnet: { url: getFullnodeUrl('mainnet') },
          devnet: { url: getFullnodeUrl('devnet') },
        }}
        defaultNetwork={network}
      >
        <WalletProvider autoConnect={false}>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

