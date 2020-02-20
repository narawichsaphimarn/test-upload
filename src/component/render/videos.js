import React, { forwardRef, useEffect, useState } from "react";
import Trash from "../assetes/trash.svg";
import "../../App.css";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import VideoPlay from "./video_render";

const RenderVideo = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  const pValue = props.value;

  console.log("pValue => ", pValue);

  useEffect(() => {
    const fileOld = props.oldFile;
    const fileNew = props.value;
    const click = props.stateClick;
    if (fileOld.length === 0 && click === true) {
      setValue(props.value ? props.value : "");
      props.plusFiles(props.value);
    } else {
      if (click === true) {
        var newData = [...fileOld, ...fileNew];
        setValue(props.value ? newData : "");
        props.plusFiles(props.value);
      } else {
        setValue(props.value ? fileOld : "");
      }
    }
  }, [pValue]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setValue(arrayMove(value, oldIndex, newIndex));
  };

  return (
    <div>
      {value.length === 0 ? (
        ""
      ) : (
        <div>
          <SortableList
            axis="xy"
            items={value}
            onSortEnd={onSortEnd}
            transitionDuration={600}
          />
        </div>
      )}
    </div>
  );
});

const SortableItem = SortableElement(({ value, index }) => {
  console.log("value ==> ", value);
  return (
    <div className="thumb" key={`${value.name}${index}`}>
      <img src={Trash} width="25" className="trashPanel" alt="Trash" />
      <div className="thumbInner">
        {value ? (
          // value.preview !== String ? (
          //   <video className="video" controls>
          //     <source src={file.preview} type={value.type} />
          //   </video>
          // ) : (
          <VideoPlay
            key={value.name + value.type + index}
            urlVideo={value.preview}
            type={value.type}
          />
        ) : (
          // )
          false
        )}
      </div>
    </div>
  );
});

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((file, index) => {
        return (
          <SortableItem
            key={`${file.name}${index}`}
            index={index}
            value={file}
          />
        );
      })}
    </div>
  );
});

export default RenderVideo;
