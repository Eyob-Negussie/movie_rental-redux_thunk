import http from "./httpService";
import jwtDecode from "jwt-decode";

const endPoint = `/auth`;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { headers } = await http.post(endPoint, { email, password });
  localStorage.setItem(tokenKey, headers["x-auth-token"]);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout(email, password) {
  localStorage.removeItem(tokenKey);
}

export function getJwt(jwt) {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}
