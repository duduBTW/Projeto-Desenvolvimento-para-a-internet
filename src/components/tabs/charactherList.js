import React, { useState, useRef } from "react";
import { useTrail, animated } from "react-spring";
import { useTransition, useSpring, useChain } from "react-spring";
import { Spring } from "react-spring/renderprops";
import { Link } from "react-router-dom";

const config = { mass: 4, tension: 1800, friction: 200 };
const defaultW = "230px";

export default function CharacterList({ characters, color, invertColor }) {
  console.log(characters);
  const [open, setOpen] = useState(false);
  const [keyI, setKeyI] = useState("");
  const [oldIndex, setOldIndex] = useState(null);
  const springRef = useRef();

  const trail = useTrail(characters.length, {
    config,
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 350 },
  });

  const replaceTextStrong = (content) => {
    if (!content) return "Nenhuma descrição";
    var splited = content.split("__");
    var result = "";
    splited.forEach((element, index) => {
      if (index !== 0) {
        if (index % 2 != 0) {
          result += "<b>" + element;
        } else {
          result += "</b>" + element;
        }
      } else {
        result += element;
      }
    });

    return result;
  };

  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: defaultW },
    to: {
      size: open ? "700%" : defaultW,
    },
  });

  useChain(open ? [springRef] : [springRef], [0, open ? 0.1 : 0]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        background: "rgb(56, 46, 50)",
      }}
    >
      {trail.map(({ y, x, ...rest }, index) => (
        <animated.div
          onClick={() => {
            console.log(false);
            if (open == true && keyI == characters[index].node.name.full) {
              setOpen((open) => !open);
            } else if (open == false) {
              setKeyI((keyI) => characters[index].node.name.full);
              setOpen((open) => !open);
            }
          }}
          style={{
            cursor: "pointer",
            width: keyI == characters[index].node.name.full ? size : "",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: 15,
            borderRadius: 13,
            background: color,
            color: invertColor(color, true),
            transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
          }}
          key={index}
        >
          <img
            src={characters[index].node.image.large}
            style={{ width: defaultW }}
            alt=""
          />
          <div className="" style={{ padding: 10 }}>
            {characters[index].node.name.full}
          </div>
          {open && keyI == characters[index].node.name.full ? (
            <>
              <Spring
                from={{
                  opacity: 0,
                  transform: "scale(0.1) translate3d(-300px,0px,0px)",
                }}
                to={{
                  opacity: 1,
                  transform: "scale(1) translate3d(0px,0px,0px)",
                }}
                out
              >
                {(props) => (
                  <div
                    style={{
                      ...props,
                      position: "absolute",
                      right: "5%",
                      top: "5%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <img
                        src={characters[index].voiceActors[0].image.large}
                        style={{ width: "70%" }}
                        alt=""
                      />
                      <div className="" style={{ padding: 10 }}>
                        {characters[index].voiceActors[0].name.full}
                      </div>
                    </div>
                  </div>
                )}
              </Spring>
              <Spring
                from={{
                  opacity: 0,
                  transform: " translate3d(300px,0px,0px)",
                }}
                to={{
                  opacity: 1,
                  transform: " translate3d(0px,0px,0px)",
                }}
                out
              >
                {(props) => (
                  <div
                    style={{
                      ...props,
                      position: "absolute",
                      left: "3%",
                      top: "4%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "30%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          overflow: "auto",
                          maxHeight: "350px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: replaceTextStrong(
                            characters[index].node.description
                          ),
                        }}
                      />
                    </div>
                  </div>
                )}
              </Spring>
            </>
          ) : null}
        </animated.div>
      ))}
    </div>
  );
}
