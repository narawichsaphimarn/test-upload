import React, { forwardRef, useEffect, useState } from "react";
import Trash from "../assetes/trash.svg";
import "../../App.css";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const RenderImage = forwardRef((props, ref) => {
  console.log("props ==> ", props);
  const [value, setValue] = useState([]);
  const pValue = props.value;
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
  console.log("value ==> ", typeof value);
  return (
    <div className="thumb" key={`${value.name}${index}`}>
      <img src={Trash} width="25" className="trashPanel" alt="Trash" />
      <div className="thumbInner">
        <img src={value.preview} className="img" alt={value.preview} />
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

export default RenderImage;
