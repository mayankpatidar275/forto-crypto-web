import { ethers } from "ethers";
import { RPC, CONTRACTS } from "../utils/constants";

export const connectToContract = async (contractKey: string) => {
  if (!CONTRACTS[contractKey]) {
    console.error(`❌ Invalid contract key: ${contractKey}`);
    return null;
  }

  const contractAddress = CONTRACTS[contractKey].address;
  const contractAbi = CONTRACTS[contractKey].abi;

  if (!contractAbi || !contractAddress) {
    console.error(
      "Contract ABI or Contract address not available",
      contractAbi,
      contractAddress,
      contractKey
    );
    return null;
  }

  try {
    let provider;
    if (typeof window !== "undefined" && window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request access to MetaMask
    } else {
      console.warn("🟡 MetaMask not detected. Using Infura RPC.");
      provider = new ethers.JsonRpcProvider(RPC);
    }

    const signer = await provider.getSigner();
    const network = await provider.getNetwork();
    console.log("Connected to network:", network.chainId);

    // Ensure user is on Sepolia
    if (network.chainId !== BigInt(11155111)) {
      console.warn("⚠️ Please switch to the Sepolia testnet (11155111)");
      return null;
    }

    // Check if contract exists
    const contractCode = await provider.getCode(contractAddress);
    if (contractCode === "0x") {
      console.error(`❌ No contract found at: ${contractAddress}`);
      return null;
    }

    console.log(`✅ Contract ${contractKey} detected at: ${contractAddress}`);

    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } catch (error) {
    console.error("Error connecting to contract:", error);
    return null;
  }
};

export const getWalletAddress = async (): Promise<string | null> => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        return accounts[0];
      } else {
        console.warn("No wallet connected");
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error getting wallet address:", error.message);
      } else {
        console.error("Unknown error occurred while getting wallet address.");
      }
      return null;
    }
  } else {
    console.warn("MetaMask not installed");
    return null;
  }
};

export const getLastDayOfCurrentMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Day 0 of next month = last day of current
  return lastDay.toISOString();
};
