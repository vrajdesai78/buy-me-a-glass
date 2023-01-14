import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ChakraProvider, extendTheme} from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
import "../styles/globals.css";

// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint
const network: Network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {

  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };

  const theme = extendTheme({ colors });
  
  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider network={network}>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
