import React, { useState, useEffect } from "react";
import Images from "./images";

const ListItemRender = props => {
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("props.item ==> ", props.item);

    setList(props.item);
  }, [props.item]);

  return (
    <li className="listPanel">
      <Images value={list.result} />
    </li>
  );
};

export default ListItemRender;
