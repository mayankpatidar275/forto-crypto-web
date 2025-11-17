"use client";

import React, { createContext, useReducer } from "react";
import { ContextStateType, ContextValue, ReducerAction } from "@/types/context";
import { SELECT_NFT, USER_UPLOADED } from "@/utils/constants";

export const Context = createContext<ContextValue | null>(null);

const initialState: ContextStateType = {
  userClerkId: "", // Changed from userPrivyId
  selectedNft: null,
};

// Reducer function
const appReducer = (
  state: ContextStateType,
  action: ReducerAction
): ContextStateType => {
  switch (action.actionType) {
    case USER_UPLOADED:
      return {
        ...state,
        userClerkId: action.value, // Changed from userPrivyId
      };
    case SELECT_NFT:
      return {
        ...state,
        selectedNft: action.value,
      };
    default:
      return state;
  }
};

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
