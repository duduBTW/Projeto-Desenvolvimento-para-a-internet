import React, { useState } from "react";
import M from "materialize-css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import ItemSearch from "../components/ItemSearch";
import HifumiPesquisar from "../images/HifumiPesquisar.png";

export default function Search() {
  const [pesquisValor, setPesquisaValor] = useState(null);
  const [title, settitle] = useState("Pesquisar");
  let [pageValor, setPageValor] = useState(1);
  let [component, setComponent] = useState([]);
  let [infinite, setinfinite] = useState(true);
  let [error, setError] = useState(null);

  const pesquisar = () => {
    setPageValor(1);
    axios
      .get(process.env.REACT_APP_API_BASE + "/anime/search", {
        params: {
          search: pesquisValor,
          page: 1,
        },
      })
      .then((response) => {
        if (response.data.data.data.Page.media.length <= 0) {
          settitle("Nunhum anime encontrado");
          setComponent([]);
        } else {
          setComponent(response.data.data.data.Page.media);
          setPageValor(2);
          setinfinite(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const novaPagina = () => getData(pesquisValor, pageValor);

  const getData = (search, page) => {
    axios
      .get(process.env.REACT_APP_API_BASE + "/anime/search", {
        params: {
          search,
          page,
        },
      })
      .then((response) => {
        const content = response.data.data.data.Page.media;
        if (content.length <= 0) {
          setinfinite(false);
          setPageValor(1);
        } else {
          setComponent([...component, ...content]);
          setPageValor(pageValor + 1);
        }
      })
      .catch((error) => {
        console.log(error);
        M.toast({ html: "Falha ao pesquisar" });
      });
  };

  var imageBackStyle = {
    maxWidth: "100%",
    minHeight: "79vh",
    backgroundImage: `url(${HifumiPesquisar})`,
    backgroundSize: "cover",
    backgroundPosition: "start start",
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pesquisar();
        }}
      >
        <div class="row" style={{ background: "#46393F" }}>
          <div class="input-field col s12">
            <i class="material-icons prefix white-text">search</i>
            <input
              style={{ color: "white" }}
              type="text"
              id="autocomplete-input"
              class="autocomplete"
              onChange={(e) => setPesquisaValor(e.target.value)}
            />
            <label for="autocomplete-input">Pesquisar</label>
          </div>
        </div>
      </form>
      <div>
        {component.length > 0 ? (
          <InfiniteScroll
            dataLength={component.length}
            next={() => novaPagina()}
            style={{
              display: "flex",
              flexBasis: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
            hasMore={infinite}
            loader={<h4>Loading...</h4>}
          >
            {component.map((item) => {
              return <ItemSearch item={item} />;
            })}
          </InfiniteScroll>
        ) : (
          // <div style={imageBackStyle}></div>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "200px",
              color: "white",
              width: "100%",
            }}
          >
            {title}
          </h1>
        )}
      </div>
    </div>
  );
}
