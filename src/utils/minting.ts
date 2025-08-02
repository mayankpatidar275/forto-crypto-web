// import {
//   getAssociatedTokenAddress,
//   getAccount,
//   createTransferInstruction,
//   TOKEN_PROGRAM_ID,
// } from "@solana/spl-token";
// import {
//   Connection,
//   PublicKey,
//   Transaction,
//   Keypair,
//   SystemProgram,
// } from "@solana/web3.js";
// import {
//   Metaplex,
//   keypairIdentity,
//   bundlrStorage,
//   toMetaplexFile,
// } from "@metaplex-foundation/js";
// import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
// import { createMint } from "@solana/spl-token";

// const connection = new Connection("https://api.devnet.solana.com"); // or mainnet-beta
// const FORTO_MINT = new PublicKey("YOUR_FORTO_TOKEN_MINT_ADDRESS");

// const metaplex = Metaplex.make(connection)
//   .use(keypairIdentity(Keypair.generate())) // Will use user's wallet later
//   .use(bundlrStorage());

// export async function checkFortoBalance(walletPublicKey: PublicKey) {
//   const ata = await getAssociatedTokenAddress(FORTO_MINT, walletPublicKey);
//   try {
//     const account = await getAccount(connection, ata);
//     return Number(account.amount);
//   } catch (e) {
//     return 0;
//   }
// }

// export async function createFortoPaymentAndMintTx({
//   walletPublicKey,
//   recipient,
//   amount,
//   imageUrl,
//   name,
//   symbol,
//   description,
// }: {
//   walletPublicKey: PublicKey;
//   recipient: PublicKey;
//   amount: number;
//   imageUrl: string;
//   name: string;
//   symbol: string;
//   description: string;
// }) {
//   const fromATA = await getAssociatedTokenAddress(FORTO_MINT, walletPublicKey);
//   const toATA = await getAssociatedTokenAddress(FORTO_MINT, recipient);

//   const transferIx = createTransferInstruction(
//     fromATA,
//     toATA,
//     walletPublicKey,
//     amount
//   );

//   // Mint a new token
//   const mintKeypair = Keypair.generate();
//   const userTokenAccount = await getAssociatedTokenAddress(
//     mintKeypair.publicKey,
//     walletPublicKey
//   );

//   const mintIx = SystemProgram.createAccount({
//     fromPubkey: walletPublicKey,
//     newAccountPubkey: mintKeypair.publicKey,
//     lamports: await connection.getMinimumBalanceForRentExemption(82),
//     space: 82,
//     programId: TOKEN_PROGRAM_ID,
//   });

//   const tx = new Transaction().add(transferIx);

//   // Upload metadata
//   const { uri } = await metaplex.nfts().uploadMetadata({
//     name,
//     symbol,
//     description,
//     image: imageUrl,
//   });

//   const { nft } = await metaplex.nfts().create({
//     uri,
//     name,
//     sellerFeeBasisPoints: 0,
//     symbol,
//     tokenOwner: walletPublicKey,
//   });

//   console.log("NFT minted:", nft.address.toBase58());

//   return tx;
// }
