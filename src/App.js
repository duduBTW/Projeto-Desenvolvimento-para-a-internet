import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import {
  set as setCookie,
  get as getCookie,
  remove as removeCookie,
} from "es-cookie";

import Routes from "./Routes";

class App extends Component {
  state = {
    user: null,
  };

  componentWillMount() {
    const userCookies = {
      email: getCookie("email"),
      id: getCookie("id"),
      userName: getCookie("name"),
      token: getCookie("token"),
    };

    this.setState({
      user: userCookies,
    });
  }

  render() {
    const { user } = this.state;
    const setUser = (novoUser) => {
      console.log(novoUser);
      this.setState({ user: novoUser });
    };

    const logOout = () => {
      removeCookie("token");
      removeCookie("email");
      removeCookie("name");
      removeCookie("id");
      this.setState({ user: null });
    };

    return <Routes user={user} logOout={logOout} setUser={setUser} />;
  }
}

export default App;
