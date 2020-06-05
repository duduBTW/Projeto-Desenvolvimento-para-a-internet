import React, { useState } from "react";
import M from "materialize-css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function RegistroComponent() {
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();

  const changeCampo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const enviarCampos = () => {
    if (userInfo.confirmPassword != userInfo.password) return;

    axios
      .post(process.env.REACT_APP_API_BASE + "/user/register", {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      })
      .then((response) => {
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        M.toast({ html: "Falha ao criar a conta" });
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
          maxWidth: 600,
          height: "100%",
          borderRadius: 4,
          padding: 20,
        }}
        className="card"
      >
        <h3 className="center">Registro</h3>
        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(e) => changeCampo(e)}
              id="name"
              name="name"
              type="text"
              className="validate"
              required
            />
            <label for="name">Nome</label>
          </div>
          <div className="input-field col s12">
            <input
              onChange={(e) => changeCampo(e)}
              id="email"
              name="email"
              type="email"
              className="validate"
              required
            />
            <label for="email">Email</label>
          </div>
          <div className="input-field col s6">
            <input
              id="senha"
              type="password"
              name="password"
              onChange={(e) => changeCampo(e)}
              required
            />
            <label for="senha">Senha</label>
          </div>
          <div className="input-field col s6">
            <input
              id="confirmSenha"
              type="password"
              name="confirmPassword"
              onChange={(e) => changeCampo(e)}
              required
            />
            <label for="confirmSenha">Confirmar Senha</label>
          </div>
        </div>
        <div className="input-field col s12 center">
          <input
            id="enviar"
            type="submit"
            className="btn"
            value="Criar"
            onClick={(e) => {
              e.preventDefault();
              enviarCampos();
            }}
          />
        </div>
      </form>
    </div>
  );
}
