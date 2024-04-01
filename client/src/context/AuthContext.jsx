import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer"; // import auth AuthReducer as Reducer function

// initial_state is the default value of the state(global state)
const INITIAL_STATE = {
  user: {
    _id: "660859811f2b25afaeb641c1",
    username: "akuncoba1",
    email: "akuncoba1@gmail.com",
    profilePicture: "person/tupac2.jpg",
    coverPicture: null,
    isAdmin: false,
    followers: [],
    followings: [],
  },
  isFetching: false,
  error: false,
};

// createContext is used to create a context and accept initial state object as an argument
export const AuthContext = createContext(INITIAL_STATE);

// AuthContextProvider is a function that takes children as an argument
export const AuthContextProvider = ({ children }) => {
  // useReducer is used to create a state (global state) and dispatch function to change or update the state
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

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
