import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import M from "materialize-css";
import { set as setCookie, get as getCookie } from "es-cookie";
import { useHistory } from "react-router-dom";

function LoginComponent({ setUser, user, props }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  const logOn = (email, password) => {
    if (!email || !password)
      return M.toast({ html: "Preencha os campos obrigatorios." });

    axios
      .post(process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_LOGIN, {
        email: email,
        password: password,
      })
      .then((response) => {
        setCookie("token", response.data.token);
        setCookie("email", response.data.userEmail);
        setCookie("name", response.data.userName);
        setCookie("id", response.data.userId);

        setUser(response.data);
        history.push("/perfil");
      })
      .catch((error) => {
        console.log(error);
        M.toast({ html: "Email ou senha errados" });
      })
      .then(() => {
        // always executed
      });
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 400,
          height: "100%",
          borderRadius: 4,
          padding: 20,
        }}
        className="card"
      >
        <h3 className="center">Entrar</h3>
        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="validate"
              required
            />
            <label for="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              id="senha"
              type="password"
              className="validate"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label for="senha">Senha</label>
          </div>
        </div>
        <div className="input-field col s12 center">
          <input
            id="enviar"
            type="submit"
            className="btn"
            value="Entrar"
            onClick={(e) => {
              e.preventDefault();
              logOn(email, password);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
