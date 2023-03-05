// Export program id and idl to constants.tsx
import { PublicKey } from "@solana/web3.js";
import { Program, Idl, AnchorProvider, setProvider } from "@project-serum/anchor";
import idl from "../utils/idl.json";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export const programId = new PublicKey(
  "7eYVtQu6nLuQ71TfteRaPQojza5wHmxYwkwJssHdKj9s"
);
