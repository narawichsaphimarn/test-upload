import React, { forwardRef, useEffect, useState } from "react";
import "../../App.css";

const RenderVideo = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  const pValue = props.value;

  useEffect(() => {}, [pValue]);

  return <div>{value.length === 0 ? "" : <div></div>}</div>;
});

export default RenderVideo;
