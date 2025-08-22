// payNftFeeFrontend.ts
import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../lib/forto_unified.json"; // <-- make sure path is correct

// Constants from your script
const PROGRAM_ID = new PublicKey(
  "8hHzJohfwgAABsuQiuBLCUBR3kyhhwPBfwXfJzKUXgD6"
);
const FORTO_MINT = new PublicKey("Zr6HoFuVNLxLRRJhNRQhkY8LQzUHzVRLgd8HWfqjDk2");

const OPERATIONAL_WALLET = new PublicKey(
  "85KjyTxfJTrDG9Zn48HaHDFPqQwdML4ShvZQTJ9a97L5"
);

// Derive PDAs similar to your script
function getEventPda(eventName: string) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("event"), Buffer.from(eventName)],
    PROGRAM_ID
  )[0];
}
function getEventVaultAuthorityPda(eventPda: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), eventPda.toBuffer()],
    PROGRAM_ID
  )[0];
}

/**
 * Front-end call (user wallet required):
 * - Derives accounts
 * - Calls program.methods.payNftFee(eventName)
 * - Returns tx signature (throw on error)
 */
export async function payNftFeeWithUser({
  connection,
  wallet, // Anchor-compatible wallet (e.g. from @solana/wallet-adapter)
  eventName,
}: {
  connection: anchor.web3.Connection;
  wallet: anchor.Wallet; // or AnchorWallet from wallet-adapter
  eventName: string;
}): Promise<string> {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
    preflightCommitment: "confirmed",
  });
  anchor.setProvider(provider);

  const program = new Program(idl, provider);

  const eventPda = getEventPda(eventName);
  const eventVaultAuthorityPda = getEventVaultAuthorityPda(eventPda);

  // User ATA (must hold FORTO before calling)
  const userTokenAccount = await getAssociatedTokenAddress(
    FORTO_MINT,
    wallet.publicKey
  );

  const operationalTokenAccount = await getAssociatedTokenAddress(
    FORTO_MINT,
    OPERATIONAL_WALLET
  );

  // Event vault ATA (PDA owner, allowOffCurve)
  const eventVaultTokenAccount = await getAssociatedTokenAddress(
    FORTO_MINT,
    eventVaultAuthorityPda,
    true
  );

  // (Optional) You might want to check user balance here and show UI if insufficient.

  const sig = await program.methods
    .payNftFee(eventName)
    .accounts({
      event: eventPda,
      fortoMint: FORTO_MINT,
      userTokenAccount,
      eventVaultTokenAccount,
      eventVaultAuthority: eventVaultAuthorityPda,
      operationalWallet: OPERATIONAL_WALLET,
      operationalTokenAccount: operationalTokenAccount,
      user: wallet.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    })
    .rpc();

  return sig;
}
