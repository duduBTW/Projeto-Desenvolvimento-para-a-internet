import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AnimeList from "../components/animeList";

class Perfil extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const { user } = this.props;

    axios
      .get(process.env.REACT_APP_API_BASE + "/user/profile", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "auth-token": user.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response.data.user[0]", response.data.user[0]);
        this.setState({
          user: response.data.user[0],
        });
      })
      .catch((error) => {});
  }

  render() {
    const { user } = this.state;
    const styleButton = { margin: 10, backgroundColor: "#46393F" };

    return user === null ? (
      <div className="progress black">
        <div className="indeterminate white"></div>
      </div>
    ) : (
      <div
        style={{ padding: 30, background: "#2A2226", minHeight: "93vh" }}
        className="container"
      >
        <h1 className="white-text center">{user.name}</h1>
        <div className="row">
          <div className="col s9">
            <AnimeList animes={user.animes} />
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
                <Link style={{ color: "white" }} to="/perfil/editar">
                  <i class="material-icons left">edit</i>Editar
                </Link>
              </div>

              <div
                onClick={this.props.logOout}
                style={styleButton}
                class="waves-effect waves-light btn"
              >
                <i class="material-icons left">exit_to_app</i>Sair
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;
