import React, { createContext, useReducer } from "react";
import { ContextStateType, ReducerAction, ContextValue } from "@/types/context";
import { SELECT_NFT, USER_UPLOADED } from "@/utils/constants";

export const Context = createContext<ContextValue | null>(null);

const initialState: ContextStateType = {
  userPrivyId: "",
  selectedNft: null,
};

const contextReducer = (
  state: ContextStateType,
  action: ReducerAction
): ContextStateType => {
  switch (action.actionType) {
    case USER_UPLOADED:
      return { ...state, userPrivyId: action.value };
    case SELECT_NFT:
      return { ...state, selectedNft: action.value };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const contextValue: ContextValue = { state, dispatch };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
