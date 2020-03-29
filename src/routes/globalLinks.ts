const signUpEnding = "/signUp";
export function linkToSignUp() {
  return signUpEnding;
}

export function globalLinkToSignUp() {
  return `${window.location.pathname}${signUpEnding}`;
}

const loginEnding = "/login";
export function linkToLogIn() {
  return loginEnding;
}

export function globalLinkToLogin() {
  return `${window.location.pathname}${loginEnding}`;
}
