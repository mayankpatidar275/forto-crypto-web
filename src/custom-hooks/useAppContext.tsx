import { useContext } from "react";
import { ContextValue } from "@/types/context";
import { Context } from "@/app/components/providers/ContextProvider";

export const useAppContext = (): ContextValue => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};
