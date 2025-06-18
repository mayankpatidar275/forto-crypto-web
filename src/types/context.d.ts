export interface AuthContextValue {
  state: AuthStateType;
  dispatch: React.Dispatch<ReducerAction>;
}

export interface AuthStateType {
  userPrivyId: string;
}

export interface ReducerAction {
  actionType: string;
  value: string;
}
