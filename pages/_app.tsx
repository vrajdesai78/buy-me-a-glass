import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ContextProvider } from "../contexts/ContextProvider";
import { FC } from 'react';
import type { AppProps } from "next/app";
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };

  const theme = extendTheme({ colors });

  return (
    <ContextProvider>
      <ChakraProvider theme={theme}>
          <Component {...pageProps} />
      </ChakraProvider>
    </ContextProvider>
  );
}

export default App;
