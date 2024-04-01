// these actions will be used when we dispatch an action
export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const followUser = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const unFollowUser = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
