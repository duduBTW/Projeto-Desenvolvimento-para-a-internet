import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";

function NavBar({ user, logOout }) {
  useEffect(() => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {
      alignment: "right",
      closeOnClick: true,
    });
  }, []);

  return (
    <div className="navbar-fixed">
      <nav style={{ background: "rgb(56, 46, 50)" }}>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            UwU
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/pesquisar">
                <i class="material-icons">search</i>
              </Link>
            </li>
            {user && user.token ? (
              <li>
                <div>
                  <Link className="white-text" to="/perfil">
                    {user.userName}
                  </Link>
                </div>
              </li>
            ) : (
              <span>
                <li>
                  <Link
                    className="waves-effect waves-light btn"
                    style={{ background: "#800509" }}
                    to="/registro"
                  >
                    Criar Conta
                  </Link>
                </li>
                <li>
                  <Link to="/login">Entrar</Link>
                </li>
              </span>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
