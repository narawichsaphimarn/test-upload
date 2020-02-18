import React, { forwardRef, useEffect, useState } from "react";
import Trash from "../assetes/trash.svg";
import "../../App.css";

const RenderVideo = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  useEffect(() => {
    console.log("props.value ==> ", props.value);
    console.log("props.oldFile ==> ", props.oldFile);
    const fileOld = props.oldFile;
    const fileNew = props.value;
    if (fileOld.length === 0) {
      setValue(props.value ? props.value : "");
    } else {
      console.log(props.stateClick);
      if (props.stateClick === 1) {
        console.log("เข้าif");
        var newData = [...fileOld, ...fileNew];
        setValue(props.value ? newData : "");
        props.plusFiles(props.value);
      } else {
        console.log("เข้าelse");
        setValue(props.value ? fileOld : "");
      }
    }
  }, [props.value]);

  const thumbs = value.map((file, index) => {
    return (
      <div className="thumb" key={`${file.name}${index}`}>
        <img src={Trash} width="25" className="trashPanel" />
        <div className="thumbInner">
          <video className="video" controls>
            <source src={file.preview} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  });

  return <div>{value.length === 0 ? "" : <div>{thumbs}</div>}</div>;
});

export default RenderVideo;
