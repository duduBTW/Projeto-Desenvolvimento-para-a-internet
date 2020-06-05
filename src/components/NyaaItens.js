import React from "react";

export default function NyaaItens({ itemNyaa }) {
  return (
    <li class="collection-item">
      <a href={itemNyaa.links.magnet}>{itemNyaa.name}</a>
    </li>
  );
}
