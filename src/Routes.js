import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./functions/isAuth";

import Login from "./screens/Login";
import Search from "./screens/Search";
import Anime from "./screens/Anime";
import Inicio from "./screens/Inicio";
import NotLoggedIn from "./components/NotLoggedIn";
import Perfil from "./screens/Perfil";
import NavBar from "./components/NavBar";
import Registro from "./screens/Registro";
import EditarPerfil from "./screens/EditarPerfil";

const PrivatrRoute = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default function Routes({ user, logOout, setUser }) {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar logOout={logOout} user={user} />
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login props={props} user={user} setUser={setUser} />
            )}
          />
          <Route
            exact
            path="/registro"
            render={(props) => <Registro props={props} user={user} />}
          />
          <Route exact path="/" render={(props) => <Inicio props={props} />} />
          <Route
            exact
            path="/pesquisar"
            render={(props) => <Search user={user} />}
          />
          <Route
            exact
            path="/anime/:id"
            render={(props) => <Anime user={user} props={props} />}
          />
          <PrivatrRoute
            exact
            path="/perfil"
            render={(props) => (
              <Perfil logOout={logOout} user={user} props={props} />
            )}
          />
          <PrivatrRoute
            exact
            path="/perfil/editar"
            render={(props) => (
              <EditarPerfil logOout={logOout} user={user} props={props} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
