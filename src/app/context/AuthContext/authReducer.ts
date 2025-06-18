import { AuthStateType, ReducerAction } from "@/types/context";
import { USER_UPLOADED } from "@/utils/constants";

export const authReducer = (state: AuthStateType, action: ReducerAction) => {
  switch (action.actionType) {
    case USER_UPLOADED:
      return {
        ...state,
        userPrivyId: action.value,
      };
    default:
      throw new Error(`Unhandled action type: ${action.actionType}`);
  }
};
