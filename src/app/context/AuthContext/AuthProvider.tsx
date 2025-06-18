import { useReducer } from "react";

import { AuthContextValue } from "@/types/context";
import { initialAuthState } from "./initialAuthState";
import { authReducer } from "./authReducer";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const contextValue: AuthContextValue = { state, dispatch };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
