import { get as getCookie } from "es-cookie";

export const isAuthenticated = () => {
  if (getCookie("token")) return true;

  return false;
};
