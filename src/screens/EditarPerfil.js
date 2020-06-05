import React, { useState } from "react";
import M from "materialize-css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditarPerfil() {
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

  const styleButton = {
    margin: 10,
    backgroundColor: "#46393F",
  };

  return (
    <div
      style={{ padding: 30, background: "#2A2226", minHeight: "93vh" }}
      className="container"
    >
      <h1 className="white-text center">{}</h1>
      <div className="row">
        <div className="col s9">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: 20,
              borderRadius: 4,
            }}
            className="card"
          >
            <h3 className="center">Editar Perfil</h3>
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
            </div>
            <div className="input-field col s12 center">
              <input
                id="enviar"
                type="submit"
                className="btn"
                value="Editar"
                onClick={(e) => {
                  e.preventDefault();
                  enviarCampos();
                }}
              />
            </div>
          </form>
        </div>
        <div className="col s3 center">
          <div
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={styleButton} class="waves-effect waves-light btn">
              <Link style={{ color: "white" }} to="/perfil">
                <i class="material-icons left">person</i>Perfil
              </Link>
            </div>

            <div style={styleButton} class="waves-effect waves-light btn">
              <i class="material-icons left">exit_to_app</i>Sair
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
