import { SelectedNftType } from "./nft";
import { SELECT_NFT, USER_UPLOADED } from "@/utils/constants";

export interface ContextValue {
  state: ContextStateType;
  dispatch: React.Dispatch<ReducerAction>;
}

export interface ContextStateType {
  userPrivyId: string;
  selectedNft: SelectedNftType | null;
}

export type ReducerAction =
  | {
      actionType: typeof USER_UPLOADED;
      value: string; // ✅ userPrivyId is always a string
    }
  | {
      actionType: typeof SELECT_NFT;
      value: SelectedNftType | null; // ✅ selectedNft is always SelectedNftType or null
    };
