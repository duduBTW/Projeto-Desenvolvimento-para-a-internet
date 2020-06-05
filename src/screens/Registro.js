import React from "react";
import { Spring, config, animated } from "react-spring/renderprops";

import RegistroComponent from "../components/registro";

export default function Registro() {
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
        from={{ opacity: 0, transform: " translate3d(0,300px,0px)" }}
        to={{ opacity: 1, transform: " translate3d(0px,0px,0px)" }}
      >
        {(props) => (
          <animated.div style={props}>
            <RegistroComponent />
          </animated.div>
        )}
      </Spring>
    </div>
  );
}
