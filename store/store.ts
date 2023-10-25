import { legacy_createStore, combineReducers, Action } from "redux";
import { IUser } from '@/interfaces';

interface SetCredentialsAction extends Action {
  type: "SET_CREDENTIALS";
  payload: {
    username: string;
    password: string;
  };
}

const initialState: IUser = {
  username: "",
  password: "",
};

const credentialsReducer = (
  state = initialState,
  action: SetCredentialsAction
): IUser => {
  switch (action.type) {
    case "SET_CREDENTIALS":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    default:
      return state;
  }
};

export const SET_CREDENTIALS = "SET_CREDENTIALS";

export const setCredentials = (username: string, password: string) => ({
  type: SET_CREDENTIALS,
  payload: { username, password },
});

const rootReducer = combineReducers({
  credentials: credentialsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = legacy_createStore(rootReducer);

export default store;
