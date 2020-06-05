import React from "react";
import { useTrail, animated } from "react-spring";
import { Link } from "react-router-dom";

const config = { mass: 5, tension: 2000, friction: 200 };

export default function AnimeList({ animes }) {
  const trail = useTrail(animes.length, {
    config,
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -350 },
  });

  return animes.length <= 0 ? (
    <div className="center">
      <h5 className="white-text">Nenhum anime adicionado a lista</h5>
      <Link to="/pesquisar">
        <div
          style={{ background: "#800509", marginTop: 15 }}
          className="waves-effect waves-light btn"
        >
          Pesquisar por animes
        </div>
      </Link>
    </div>
  ) : (
    <div style={{ border: "none" }} class="collection">
      {trail.map(({ y, ...rest }, index) => (
        <animated.div
          style={{
            ...rest,
            transform: y.interpolate((y) => `translate3d(${y}px,0,0)`),
          }}
          key={animes[index].anilistId}
        >
          <Link to={`/anime/${animes[index].anilistId}`}>
            <a
              style={{ backgroundColor: "#46393F", color: "white" }}
              href="#!"
              class="collection-item"
            >
              <animated.div>{animes[index].name}</animated.div>
            </a>
          </Link>
        </animated.div>
      ))}
    </div>
  );
}
