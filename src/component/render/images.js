import React, { forwardRef, useEffect, useState } from "react";
import Trash from "../assetes/trash.svg";
import "../../App.css";

const RenderImage = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  useEffect(() => {
    console.log("props.value ==> ", props.value);
    console.log("props.oldFile ==> ", props.oldFile);
    const fileOld = props.oldFile;
    const fileNew = props.value;
    if (fileOld.length === 0) {
      setValue(props.value ? props.value : "");
    } else {
      var newData = [...fileOld, ...fileNew];
      setValue(props.value ? newData : "");
    }
    props.plusFiles(props.value);
  }, [props.value]);

  const thumbs = value.map((file, index) => {
    return (
      <div className="thumb" key={`${file.name}${index}`}>
        <img src={Trash} width="25" className="trashPanel" />
        <div className="thumbInner">
          <img src={file.preview} className="img" />
        </div>
      </div>
    );
  });

  return <div>{value.length === 0 ? "" : <div>{thumbs}</div>}</div>;
});

export default RenderImage;
