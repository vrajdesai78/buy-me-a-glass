import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import type { AppProps } from "next/app";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
      ],
      [network]
  );

  const theme = extendTheme({ colors });

  return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <ChakraProvider theme={theme}>
            <Component {...pageProps} />
            </ChakraProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  );
};

export default App;
