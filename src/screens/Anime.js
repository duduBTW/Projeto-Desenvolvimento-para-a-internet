import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import NyaaItens from "../components/NyaaItens";
import AnimeInfo from "../components/AnimeInfo";

export default function Anime({ props, user }) {
  const [animeId, setAnimeId] = useState(props.match.params.id);
  let [component, setComponent] = useState([]);
  let [animeUser, setAnimeUser] = useState([]);
  let [hasAnime, setHasAnime] = useState([]);
  let [nyaa, setNyaa] = useState([]);
  let [page, setPage] = useState(1);
  let [keepGoing, setKeepGoing] = useState(true);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user.token);
    axios
      .get(process.env.REACT_APP_API_BASE + "/anime/infos", {
        params: {
          id: animeId,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "auth-token": user == null ? null : user.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setComponent(response.data.data.data.Media);
        setHasAnime(response.data.data.hasAnimes);
        if (response.data.data.hasAnimes) {
          setAnimeUser(response.data.data.animes);
        }
        getNyaa(response.data.data.data.Media.title.romaji);
        console.log(response.data.data.data.Media);
      })
      .catch((error) => {});
  }, []);

  const getNyaa = (title = component.title.romaji) => {
    axios
      .get(process.env.REACT_APP_API_BASE + "/anime/animeInfo", {
        params: {
          search: title,
          page: page,
        },
      })
      .then((response) => {
        setNyaa([...nyaa, ...response.data.data.results]);
        if (response.data.data.maxPage >= page) {
          setPage(page + 1);
        } else {
          setKeepGoing(false);
          console.log("end");
        }
        console.log(response.data.data);
      })
      .catch((error) => {});
  };

  const changeStatus = (animes, status) => {
    setHasAnime(status);
    setAnimeUser(animes);
  };
  return component.length <= 0 ? (
    <div className="progress black">
      <div className="indeterminate white"></div>
    </div>
  ) : (
    <div>
      <AnimeInfo
        animeUser={animeUser}
        hasAnime={hasAnime}
        component={component}
        animeId={animeId}
        user={user}
        changeStatus={changeStatus}
      />
      <div>
        {nyaa.length <= 0
          ? null
          : // <ul class="collection">
            //   <InfiniteScroll
            //     dataLength={nyaa.length}
            //     next={() => getNyaa()}
            //     hasMore={keepGoing}
            //     loader={<h4>Loading...</h4>}
            //   >
            //     {nyaa.map((itemNyaa) => {
            //       return <NyaaItens itemNyaa={itemNyaa} />;
            //     })}
            //   </InfiniteScroll>
            // </ul>
            null}
        {/* <div class="row">
        {component.trailer !== null && component.trailer.site === "youtube" ? (
          <iframe
            class="col m12 l6"
            style={{ minHeight: "100%" }}
            src={`https://www.youtube.com/embed/${component.trailer.id}`}
          ></iframe>
        ) : null}
      </div> */}
      </div>
    </div>
  );
}
