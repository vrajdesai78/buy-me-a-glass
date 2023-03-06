import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { programId } from "./constants";

export const getProgram = (connection: Connection, wallet: any) => {
    const idl = require("./idl.json");
    const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    const program = new Program(idl, programId, provider);
    return program;
};

export const getUserAccountPk = (username: String) => {
    return (
         PublicKey.findProgramAddressSync(
            [Buffer.from("user"), Buffer.from(username)],
            programId
        )
    )[0];
}