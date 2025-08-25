// import { client } from "@/lib/client";
// import { ethers6Adapter } from "thirdweb/adapters/ethers6";

// import { ethers } from "ethers";
// import toast from "react-hot-toast";

// const EXPECTED_CHAIN_ID = 8453;

// export const connectToContract = async (
//   contractKey: string,
//   account: any,
//   chain: any
// ) => {
//   if (!CONTRACTS[contractKey]) return null;
//   const { address, abi } = CONTRACTS[contractKey];
//   if (!address || !abi || !account || chain?.id !== EXPECTED_CHAIN_ID)
//     return null;

//   try {
//     const signer = ethers6Adapter.signer.toEthers({ client, chain, account });
//     return new ethers.Contract(address, abi, signer);
//   } catch (error) {
//     console.error("❌ Contract connection error:", error);
//     return null;
//   }
// };

// export const buyNfts = async (
//   rate: number,
//   imageUrls: string[],
//   account: any,
//   chain: any
// ) => {
//   const numberOfTickets = imageUrls.length;
//   if (!numberOfTickets) return toast.error("No items selected.");

//   const TIMEOUT_MS = 60000;
//   const fortoTicketAddress = CONTRACTS["FORTO_TICKET"].address;

//   let toastId: string | undefined;

//   try {
//     toastId = toast.loading("Connecting to contracts...");
//     const ticketContract = await connectToContract(
//       "FORTO_TICKET",
//       account,
//       chain
//     );
//     const tokenContract = await connectToContract(
//       "FORTO_TOKEN",
//       account,
//       chain
//     );
//     toast.dismiss(toastId);

//     if (!ticketContract || !tokenContract)
//       throw new Error("Contract connection failed.");

//     const totalForto = BigInt(numberOfTickets) * BigInt(rate);
//     const cost = ethers.parseUnits(totalForto.toString(), 18);

//     // 1️⃣ Approve Token
//     toastId = toast.loading("Please approve token spending in wallet...");
//     const approveTx = await withTimeout(
//       tokenContract.approve(fortoTicketAddress, cost),
//       TIMEOUT_MS,
//       "Token approval timed out"
//     );
//     toast.dismiss(toastId);

//     toastId = toast.loading("Waiting for approval confirmation...");
//     await waitForConfirmation(approveTx, TIMEOUT_MS);
//     toast.dismiss(toastId);

//     // 2️⃣ Mint NFT
//     toastId = toast.loading("Please confirm mint in wallet...");
//     const mintTx = await withTimeout(
//       ticketContract.mintNFT(numberOfTickets, imageUrls),
//       TIMEOUT_MS,
//       "Mint transaction timed out"
//     );
//     toast.dismiss(toastId);

//     toastId = toast.loading("Waiting for mint confirmation...");
//     await waitForConfirmation(mintTx, TIMEOUT_MS);
//     toast.dismiss(toastId);

//     toast.success(`Successfully minted ${numberOfTickets} NFT(s)!`);
//   } catch (error) {
//     toast.dismiss(toastId);
//     handleTxError(error);
//     throw error;
//   }
// };

// const waitForConfirmation = async (tx: any, timeout: number) => {
//   // iOS Safari quirk fix: wait briefly before calling wait()
//   // Fix for iOS popup returning issues
//   await new Promise((res) => setTimeout(res, 1200));
//   return withTimeout(tx.wait(), timeout, "Transaction confirmation timed out");
// };

// const withTimeout = async <T>(
//   promise: Promise<T>,
//   timeoutMs: number,
//   errorMsg = "Operation timed out"
// ): Promise<T> => {
//   return Promise.race([
//     promise,
//     new Promise<T>((_, reject) =>
//       setTimeout(() => reject(new Error(errorMsg)), timeoutMs)
//     ),
//   ]);
// };

// export const handleTxError = (error: any) => {
//   console.error("NFT Minting Error:", error);

//   const message = error?.message || "";

//   setTimeout(() => {
//     if (error?.code === 4001 || /User denied/i.test(message)) {
//       toast.error("Transaction cancelled by user.");
//     } else if (/timeout/i.test(message)) {
//       toast.error("⏱️ Transaction timed out. Please try again.");
//     } else if (/chain|network/i.test(message)) {
//       toast.error("⚠️ You're connected to the wrong network.");
//     } else {
//       toast.error(
//         message.length > 100
//           ? message.slice(0, 100) + "..."
//           : message || "Something went wrong."
//       );
//     }
//   }, 300); // Allow iOS context to recover
// };

export const getLastDayOfCurrentMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Day 0 of next month = last day of current
  return lastDay.toISOString();
};
