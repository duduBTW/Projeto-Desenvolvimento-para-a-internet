import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";

import CharacterList from "./charactherList";

const pages = [
  ({ component, style, invertColor }) => (
    <CharacterList
      color={component.coverImage.color}
      characters={component.characters.edges}
      invertColor={invertColor}
    />
  ),
  ({ component, style }) => (
    <iframe
      width="1280"
      height="720"
      src={"https://www.youtube.com/embed/" + component.trailer.id}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  ),
];

export default function Tabs({ component, invertColor }) {
  const [tabIndex, setTabIndex] = useState(0);

  const onClickTab = (indexNeeded) => {
    setTabIndex(indexNeeded);
  };

  return (
    <div className="row">
      <div
        className="col s2"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          onClick={() => setTabIndex(0)}
          class="waves-effect waves-light btn-small"
          style={{
            margin: 5,
            background: component.coverImage.color,
            color: invertColor(component.coverImage.color, true),
          }}
        >
          <i class="material-icons left">person</i>Personagens
        </div>
        {component.trailer ? (
          <div
            onClick={() => setTabIndex(1)}
            class="waves-effect waves-light btn-small"
            style={{
              margin: 5,
              background: component.coverImage.color,
              color: invertColor(component.coverImage.color, true),
            }}
          >
            <i class="material-icons left">tv</i>Trailer
          </div>
        ) : null}
      </div>
      <div
        className="col s10"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          flexDirection: "row",
          background: "rgb(56, 46, 50)",
        }}
      >
        {pages.map((item, index) => {
          if (index == tabIndex) {
            const Page = item;
            return <Page component={component} invertColor={invertColor} />;
          }
        })}
      </div>
    </div>
  );
}
