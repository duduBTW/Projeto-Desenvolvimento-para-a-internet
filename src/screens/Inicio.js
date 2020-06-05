import React, { useState, useRef } from "react";
import { Global, Container, Item } from "../components/cssJs/styles";
import { useTransition, useSpring, useChain, animated } from "react-spring";
import { Spring, config } from "react-spring/renderprops";
import data from "../components/cssJs/data";
import ItemSearch from "../components/ItemSearch";

const defaultW = "100%";

export default function Inicio() {
  const [open, setOpen] = useState(false);
  const [keyI, setKeyI] = useState("");
  const springRef = useRef();

  console.log(open);

  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: defaultW },
    to: {
      size: open ? "800%" : defaultW,
    },
  });

  const transRef = useRef();
  const transitions = useTransition(open ? data : [], (item) => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / data.length,
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  });

  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0,
  ]);

  const item = [
    {
      bannerImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21455-jdmsPdbQoZFk.png",
      characters: {
        edges: [],
      },
      coverImage: {
        color: "#aee4f1",
        extraLarge:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/21455-8JP9u1bKHVr7.jpg",
        large:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/21455-8JP9u1bKHVr7.jpg",
      },
      description:
        "Meet Aoba Suzukaze, a fresh high-school graduate easily mistaken for a middle school student who joins the game company that produced her favorite game as a 3D artist, and her cute antics as she gets her way through work and deals with her rather wacky co-workers.",
      episodes: 12,
      id: 21455,
      status: "FINISHED",
      title: { english: null, romaji: "New Game!", native: "NEW GAME!" },
      trailer: {
        id: "-5jO-orwaQE",
        site: "youtube",
        thumbnail: "https://i.ytimg.com/vi/-5jO-orwaQE/hqdefault.jpg",
      },
    },
    {
      bannerImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21455-jdmsPdbQoZFk.png",
      characters: {
        edges: [],
      },
      coverImage: {
        color: "#aee4f1",
        extraLarge:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/21455-8JP9u1bKHVr7.jpg",
        large:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/21455-8JP9u1bKHVr7.jpg",
      },
      description:
        "Meet Aoba Suzukaze, a fresh high-school graduate easily mistaken for a middle school student who joins the game company that produced her favorite game as a 3D artist, and her cute antics as she gets her way through work and deals with her rather wacky co-workers.",
      episodes: 12,
      id: 21455,
      status: "FINISHED",
      title: { english: null, romaji: "New Game!2", native: "NEW GAME!" },
      trailer: {
        id: "-5jO-orwaQE",
        site: "youtube",
        thumbnail: "https://i.ytimg.com/vi/-5jO-orwaQE/hqdefault.jpg",
      },
    },
  ];

  return (
    <>
      {item.map((itemAn) => (
        <animated.div
          onClick={() => {
            setOpen((open) => !open);
            setKeyI((keyI) => itemAn.title.romaji);
          }}
          style={{
            width: keyI == itemAn.title.romaji ? size : defaultW,
            margin: 15,
            borderRadius: 13,
            background: "white",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <img src={itemAn.coverImage.large} alt="" />
            <div className="" style={{ padding: 10 }}>
              {itemAn.title.romaji}
            </div>
          </div>
          {open && keyI == itemAn.title.romaji ? (
            <Spring
              delay={650}
              from={{ opacity: 0, transform: "translate3d(300px,0px,0px)" }}
              to={{ opacity: 1, transform: "translate3d(0px,0px,0px)" }}
              out
            >
              {(props) => (
                <div
                  style={{
                    ...props,
                    maxWidth: "300px",
                    position: "absolute",
                    left: "280px",
                  }}
                >
                  {itemAn.title.romaji}
                  <br />
                  {itemAn.description}
                </div>
              )}
            </Spring>
          ) : null}
        </animated.div>
      ))}
    </>
  );
}
