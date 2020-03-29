const signUpEnding = "/signUp";
export function linkToSignUp() {
  return signUpEnding;
}

export function globalLinkToSignUp() {
  return `${replaceLastSlashFromWindow()}${signUpEnding}`;
}

const loginEnding = "/login";
export function linkToLogIn() {
  return loginEnding;
}

export function globalLinkToLogin() {
  return `${replaceLastSlashFromWindow()}${loginEnding}`;
}

function replaceLastSlashFromWindow() {
  const path = window.location.pathname;
  if (path.endsWith("/")) {
    return path.substring(0, path.length - 1);
  }

  return path;
}
