import React, { useEffect } from "react";
import { set as setCookie, get as getCookie } from "es-cookie";

export default function NotLoggedIn(props) {
  useEffect(() => {
    const userCookies = {
      email: getCookie("email"),
      id: getCookie("id"),
      name: getCookie("name"),
      token: getCookie("token"),
    };
    if (userCookies.token !== null) props.redirect();

    props.setUser(userCookies);
  }, []);

  return props.user && props.user.token ? null : <div> {props.children} </div>;
}
