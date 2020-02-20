import React, { useState, useEffect } from "react";

const data = {
  id: "",
  type: "",
  type_file: "",
  bucket: "",
  key_bucket: "",
  video_id: "",
  status: "verifly",
  is_delete: false,
  duration: 0,
  path: "",
  storage: ""
};

const ListItem = props => {
  const [mediaFile, setMediaFile] = useState([]);
  useEffect(() => {
    console.log(props.item);
    setMediaFile(
      props.item ? [{ ...data }, props.item.name, props.item.type] : []
    );
  }, [props.item]);
  return <li>{props.item.name}</li>;
};

export default ListItem;
