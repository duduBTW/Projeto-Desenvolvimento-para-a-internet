import React, { useState } from "react";
import axios from "axios";
import M from "materialize-css";
import Tabs from "./tabs/Tabs";

import AnimeInfoHeader from "./animeInfoHeader";

export default function AnimeInfo({
  component,
  hasAnime,
  user,
  animeId,
  changeStatus,
}) {
  const [tab, setTab] = useState(1);
  const invertColor = (hex, bw) => {
    if (hex == null) return "black";
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      return "#ffffff";
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
  };

  function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  }

  const addAnime = () => {
    console.log(animeId);
    axios
      .post(
        process.env.REACT_APP_API_BASE + "/anime/add",
        {
          anilistId: animeId,
          status: 1,
          name: component.title.romaji,
          episodesWatched: 1,
        },
        {
          headers: {
            "auth-token": user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        changeStatus(response.data.animes, true);
        M.toast({
          html: "Adicionado",
        });
      })
      .catch((error) => {});
  };
  const removeAnime = () => {
    axios
      .post(
        process.env.REACT_APP_API_BASE + "/anime/remove",
        {
          anilistId: animeId,
        },
        {
          headers: {
            "auth-token": user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        changeStatus(response.data.animes, false);
        M.toast({
          html: "Removido!",
        });
      })
      .catch((error) => {});
  };

  var toastHTML =
    '<span>I am toast content</span><button class="btn-flat toast-action">Undo</button>';

  return (
    <div className="">
      <AnimeInfoHeader
        component={component}
        invertColor={invertColor}
        removeAnime={removeAnime}
        addAnime={addAnime}
        hasAnime={hasAnime}
      />
      <Tabs component={component} invertColor={invertColor} />
    </div>
  );
}
