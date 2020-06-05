import React, { useState } from "react";
import { Spring, config, animated } from "react-spring/renderprops";

import LoginComponent from "../components/LoginComponent";

function Login({ setUser, user, props }) {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "100px",
        justifyContent: "center",
      }}
    >
      <Spring
        native
        config={config.gentle}
        from={{ opacity: 0, transform: " translate3d(0,-300px,0px)" }}
        to={{ opacity: 1, transform: " translate3d(0px,0px,0px)" }}
      >
        {(props) => (
          <animated.div style={props}>
            <LoginComponent user={user} props={props} setUser={setUser} />
          </animated.div>
        )}
      </Spring>
    </div>
  );
}

export default Login;
