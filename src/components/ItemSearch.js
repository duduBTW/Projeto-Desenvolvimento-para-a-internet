import React from "react";
import { Link } from "react-router-dom";

export default function ItemSearch({ item }) {
  console.log(item);
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
      throw new Error("Invalid HEX color.");
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

  return (
    <div
      className="card"
      style={{
        background: item.coverImage.color,
        maxWidth: 250,
        margin: 30,
      }}
    >
      <Link to={`/anime/${item.id}`} key={item.id}>
        <div className="card-image">
          <img
            style={{ objectFit: "cover", maxHeight: 300 }}
            src={item.coverImage.large}
            alt=""
          />
          {/* <span className="card-title">{item.title.romaji}</span> */}
        </div>
        <div className="card-content">
          <p
            className="truncate"
            style={{
              color: invertColor(item.coverImage.color, true),
            }}
          >
            {item.title.romaji}
          </p>
        </div>
      </Link>
    </div>
  );
}
