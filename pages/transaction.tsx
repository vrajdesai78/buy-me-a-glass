import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Program,
  Idl,
  AnchorProvider,
  setProvider,
} from "@project-serum/anchor";
import { PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import idl from "../utils/idl.json";
import * as Web3 from "@solana/web3.js";
import { programId } from "../utils/constants";

export default function transaction() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [userPDA, setUserPDA] = React.useState<PublicKey | undefined>(undefined);


  const send = async () => {
    const url = "https://api.devnet.solana.com";
  
  const [addr] = Web3.PublicKey.findProgramAddressSync(
    [Buffer.from("user"), Buffer.from("cool")],
    programId
  )
  
  const program = new Program(idl as Idl, programId);
  const parsedData = await program.account;

  console.log(parsedData)
  };
  return (
    <>
      <Button onClick={send}>Click me</Button>
    </>
  );
}
