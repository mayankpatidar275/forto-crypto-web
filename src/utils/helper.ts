import { client } from "@/lib/client";
import { ethers6Adapter } from "thirdweb/adapters/ethers6";
import { CONTRACTS } from "../utils/constants";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const EXPECTED_CHAIN_ID = 8453;

export const connectToContract = async (
  contractKey: string,
  account: any,
  chain: any
) => {
  if (!CONTRACTS[contractKey]) return null;
  const { address, abi } = CONTRACTS[contractKey];
  if (!address || !abi || !account || chain?.id !== EXPECTED_CHAIN_ID)
    return null;

  try {
    const signer = ethers6Adapter.signer.toEthers({ client, chain, account });
    return new ethers.Contract(address, abi, signer);
  } catch (error) {
    console.error("❌ Contract connection error:", error);
    return null;
  }
};

export const buyNfts = async (
  rate: number,
  imageUrls: string[],
  account: any,
  chain: any
) => {
  const numberOfTickets = imageUrls.length;
  if (!numberOfTickets) return toast.error("No items selected.");

  const TIMEOUT_MS = 60000;
  const fortoTicketAddress = CONTRACTS["FORTO_TICKET"].address;

  try {
    const connectingToast = toast.loading("Connecting to contracts...");
    const ticketContract = await connectToContract(
      "FORTO_TICKET",
      account,
      chain
    );
    const tokenContract = await connectToContract(
      "FORTO_TOKEN",
      account,
      chain
    );
    toast.dismiss(connectingToast);

    if (!ticketContract || !tokenContract)
      throw new Error("Contract connection failed.");

    const totalForto = BigInt(numberOfTickets) * BigInt(rate);
    const cost = ethers.parseUnits(totalForto.toString(), 18);

    // Step 1: Approve
    const approveToast = toast.loading(
      "Please approve token spending in wallet..."
    );
    const approveTx = await withTimeout(
      tokenContract.approve(fortoTicketAddress, cost),
      TIMEOUT_MS,
      "Token approval timed out"
    );
    toast.dismiss(approveToast);

    const confirmingApprovalToast = toast.loading("Confirming approval...");
    await waitForConfirmation(approveTx, TIMEOUT_MS);
    toast.dismiss(confirmingApprovalToast);

    // Step 2: Mint
    const mintToast = toast.loading("Please confirm mint in wallet...");
    const mintTx = await withTimeout(
      ticketContract.mintNFT(numberOfTickets, imageUrls),
      TIMEOUT_MS,
      "Mint transaction timed out"
    );
    toast.dismiss(mintToast);

    const confirmMintToast = toast.loading("Waiting for mint confirmation...");
    await waitForConfirmation(mintTx, TIMEOUT_MS);
    toast.dismiss(confirmMintToast);

    toast.success(`✅ Successfully minted ${numberOfTickets} NFT(s)!`);
  } catch (error) {
    toast.dismiss();
    handleTxError(error);
    throw error;
  }
};

const waitForConfirmation = async (tx: any, timeout: number) => {
  // iOS Safari quirk fix: wait briefly before calling wait()
  await new Promise((res) => setTimeout(res, 1200));
  return withTimeout(tx.wait(), timeout, "Transaction confirmation timed out");
};

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMsg = "Operation timed out"
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMsg)), timeoutMs)
    ),
  ]);
};

export const handleTxError = (error: any) => {
  console.error("NFT Minting Error:", error);

  const message = error?.message || "";

  if (error?.code === 4001 || /User denied/i.test(message)) {
    toast.error("Transaction was cancelled by the user.");
  } else if (/timeout/i.test(message)) {
    toast.error("⏱️ Transaction timed out. Please try again.");
  } else if (/chain|network/i.test(message)) {
    toast.error("⚠️ Please connect to the Base Mainnet network.");
  } else {
    toast.error(
      message.length > 100
        ? message.slice(0, 100) + "..."
        : message || "Something went wrong."
    );
  }
};

// import { ethers } from "ethers";
// import { RPC, CONTRACTS } from "../utils/constants";
// import toast from "react-hot-toast";

// export const connectToContract = async (contractKey: string) => {
//   if (!CONTRACTS[contractKey]) {
//     console.error(`❌ Invalid contract key: ${contractKey}`);
//     return null;
//   }

//   const contractAddress = CONTRACTS[contractKey].address;
//   const contractAbi = CONTRACTS[contractKey].abi;

//   if (!contractAbi || !contractAddress) {
//     console.error(
//       "Contract ABI or Contract address not available",
//       contractAbi,
//       contractAddress,
//       contractKey
//     );
//     return null;
//   }

//   try {
//     let provider;
//     if (typeof window !== "undefined" && window.ethereum) {
//       provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//     } else {
//       console.warn("🟡 MetaMask not detected. Using Base Mainnet RPC.");
//       provider = new ethers.JsonRpcProvider(RPC);
//     }

//     const signer = await provider.getSigner();
//     const network = await provider.getNetwork();
//     console.log("Connected to network:", network.chainId);

//     // Ensure user is on Base Mainnet
//     if (network.chainId !== BigInt(8453)) {
//       console.warn("⚠️ Please switch to the Base Mainnet (8453)");
//       return null;
//     }

//     const contractCode = await provider.getCode(contractAddress);
//     if (contractCode === "0x") {
//       console.error(`❌ No contract found at: ${contractAddress}`);
//       return null;
//     }

//     console.log(`✅ Contract ${contractKey} detected at: ${contractAddress}`);

//     const contract = new ethers.Contract(contractAddress, contractAbi, signer);
//     return contract;
//   } catch (error) {
//     console.error("Error connecting to contract:", error);
//     return null;
//   }
// };

// export const buyNfts = async (rate: number, imageUrls: string[]) => {
//   const numberOfTickets = imageUrls.length;
//   if (!numberOfTickets) {
//     console.log("Number of Tickets is required: ", numberOfTickets);
//     return;
//   }
//   // Connect to the ticket and token contracts
//   const ticketContract = await connectToContract("FORTO_TICKET");
//   const tokenContract = await connectToContract("FORTO_TOKEN");
//   if (!ticketContract || !tokenContract) {
//     throw new Error("Unable to connect to contracts");
//   }
//   console.log("calculating forto cost...");

//   // 1) figure out how many FORTO we need, scaled to 18 decimals
//   const totalForto = BigInt(numberOfTickets) * BigInt(rate);
//   const cost = ethers.parseUnits(totalForto.toString(), 18);

//   console.log("Cost in FORTO:", cost.toString());

//   // 2) give the ticket contract permission to pull that many FORTO
//   const fortoTicketContractAdd = CONTRACTS["FORTO_TICKET"].address;
//   const approveTx = await tokenContract.approve(fortoTicketContractAdd, cost);
//   await approveTx.wait();
//   console.log("Approved FORTO:", cost.toString());

//   // 3) now mint — the contract will internally transferFrom() your tokens
//   const mintTx = await ticketContract.mintNFT(numberOfTickets, imageUrls);
//   await mintTx.wait();

//   toast.success(`Successfully minted ${numberOfTickets} NFT(s)!`);
// };

// export const getWalletAddress = async (): Promise<string | null> => {
//   if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//     try {
//       const accounts: string[] = await window.ethereum.request({
//         method: "eth_accounts",
//       });

//       if (accounts.length > 0) {
//         return accounts[0];
//       } else {
//         console.warn("No wallet connected");
//         return null;
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error getting wallet address:", error.message);
//       } else {
//         console.error("Unknown error occurred while getting wallet address.");
//       }
//       return null;
//     }
//   } else {
//     console.warn("MetaMask not installed");
//     return null;
//   }
// };

export const getLastDayOfCurrentMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Day 0 of next month = last day of current
  return lastDay.toISOString();
};
