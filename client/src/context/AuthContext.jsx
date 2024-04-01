import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer"; // import auth AuthReducer as Reducer function

// initial_state is the default value of the state(global state)
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// createContext is used to create a context and accept initial state object as an argument
export const AuthContext = createContext(INITIAL_STATE);

// AuthContextProvider is a function that takes children as an argument
export const AuthContextProvider = ({ children }) => {
  // useReducer is used to create a state (global state) and dispatch function to change or update the state
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    // Simpan data pengguna ke localStorage setelah setiap perubahan
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  // AuthContext.Provider is a component that provides the state and dispatch function to its children
  return (
    <AuthContext.Provider
      // value is an object that contains the state and dispatch function, and we pass them as props, so that we can access them in other components
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
