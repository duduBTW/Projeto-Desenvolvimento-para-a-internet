import React from "react";
import { Spring, config } from "react-spring/renderprops";

export default function AnimeInfoHeader({
  component,
  invertColor,
  removeAnime,
  addAnime,
  hasAnime,
}) {
  return (
    <Spring
      config={config.slow}
      from={{ opacity: 0, transform: "translate3d(0px,-300px,0px)" }}
      to={{ opacity: 1, transform: "translate3d(0px,0px,0px)" }}
    >
      {(props) => (
        <div style={props}>
          <div
            class="row"
            style={{
              backgroundImage: `url(${component.bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="col s12"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Spring
                delay={650}
                from={{ opacity: 0, transform: "translate3d(-300px,0px,0px)" }}
                to={{ opacity: 1, transform: "translate3d(0px,0px,0px)" }}
              >
                {(props) => (
                  <div style={props}>
                    <div
                      className="card-panel"
                      style={{
                        background: invertColor(
                          component.coverImage.color,
                          true
                        ),
                        maxWidth: 400,
                        boxShadow:
                          "0 10px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        padding: 20,
                        borderRadius: "13px",
                        color: invertColor(
                          invertColor(component.coverImage.color, true),
                          true
                        ),
                      }}
                      dangerouslySetInnerHTML={{
                        __html: component.description,
                      }}
                    />
                  </div>
                )}
              </Spring>
              <div style={{ position: "relative" }}>
                <img
                  //class="col s12 white-text"
                  style={{
                    marginTop: "15px",
                    minWidth: 200,
                    borderRadius: "13px",
                  }}
                  src={component.coverImage.large}
                />
                <strong>
                  <h6
                    //className="truncate"
                    style={{
                      maxWidth: 230,
                      padding: 20,
                      borderRadius: "13px",
                      color: invertColor(
                        invertColor(component.coverImage.color, true),
                        true
                      ),
                      background: invertColor(component.coverImage.color, true),
                    }}
                    dangerouslySetInnerHTML={{ __html: component.title.romaji }}
                  />
                </strong>
              </div>
              <div
                style={{
                  width: 400,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spring
                  delay={650}
                  from={{
                    opacity: 0,
                    transform: "translate3d(300px,0px,0px)",
                  }}
                  to={{ opacity: 1, transform: "translate3d(0px,0px,0px)" }}
                >
                  {(props) => (
                    <div style={props}>
                      <div
                        className="card-panel"
                        style={{
                          background: invertColor(
                            component.coverImage.color,
                            true
                          ),
                          padding: 10,
                          borderRadius: "13px",
                          boxShadow:
                            "0 10px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        }}
                      >
                        {hasAnime ? (
                          <div
                            onClick={removeAnime}
                            class="waves-effect waves-light btn-small"
                            style={{
                              margin: 5,
                              background: component.coverImage.color,
                              color: invertColor(
                                component.coverImage.color,
                                true
                              ),
                            }}
                          >
                            <i class="material-icons left">delete</i>Remover da
                            lista
                          </div>
                        ) : (
                          <div
                            onClick={addAnime}
                            class="waves-effect waves-light btn-small"
                            style={{
                              margin: 5,
                              background: component.coverImage.color,
                              color: invertColor(
                                component.coverImage.color,
                                true
                              ),
                            }}
                          >
                            <i class="material-icons left">add</i>Adicionar a
                            lista
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Spring>
              </div>
            </div>
          </div>
        </div>
      )}
    </Spring>
  );
}
