export function logIn(newAction) {
  return {
    type: "LOG_IN",
    payload: newAction
  };
}
export function logOut(newAction) {
  return {
    type: "LOG_OUT",
    payload: newAction,
  };
}
