import React, { forwardRef, useEffect, useState } from "react";
import "../../App.css";

const RenderImage = forwardRef((props, ref) => {
  console.log("props ==> ", props);
  const [value, setValue] = useState([]);

  const pValue = props.value;

  useEffect(() => {
    setValue(pValue);
  }, [pValue]);

  return (
    <div className="imgPanel">
      <img src="https://img.icons8.com/cotton/150/000000/stack-of-photos.png" />
    </div>
  );
});

export default RenderImage;
