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

export default function transaction() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [userPDA, setUserPDA] = React.useState<PublicKey | undefined>(undefined);

  useEffect(() => {
    if (wallet) {
        console.log("Wallet connected", wallet);
        const provider = new AnchorProvider(connection, (wallet as any), AnchorProvider.defaultOptions());
        setProvider(provider);
    }
    }, [wallet]);

  const programId = new PublicKey(
    "8McHBd1EVgVySm4GwZt6tkPMqmExGcQMGv8ge26B5Mo"
  );

  const send = async () => {
    const [USER_PDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from("user"), Buffer.from("hello")],
      programId
    );

    const program = new Program(idl as Idl, programId);

    const transaction = await program.methods
      .createUser("hello", "testcid")
      .accounts({ userAccount: USER_PDA, authority: wallet!.publicKey })
      .rpc();
      await connection.confirmTransaction(transaction);
      console.log("Transaction confirmed", transaction);
  };
  return (
    <>
      <Button onClick={send}>Click me</Button>
    </>
  );
}
