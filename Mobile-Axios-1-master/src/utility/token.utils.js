
import Cookies from 'js-cookie';

export const AUTH_TOKEN_KEY = "my_key";

export const getAuthToken = () => {
  if (typeof window === undefined) {
    return null;
  }
  return Cookies.get(AUTH_TOKEN_KEY);
};

export const getUserData = () => {
  if (localStorage.getItem("logindata")) {

    const loginData = JSON.parse(localStorage.getItem("logindata"))
    return loginData
  }
  else {
    return('')
  }
}

export function setAuthToken(token) {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires: 1 });
}

export function removeAuthToken() {
  Cookies.remove(AUTH_TOKEN_KEY);
}
export function checkHasAuthToken() {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  if (!token) return false;
  return true;
}
