import React, { forwardRef, useEffect, useState } from "react";
import Trash from "../assetes/trash.svg";
import "../../App.css";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setValue(arrayMove(value, oldIndex, newIndex));
  };

  console.log("value ", value);
  return (
    <div>
      {value.length === 0 ? (
        ""
      ) : (
        <div>
          <SortableList axis="xy" items={value} onSortEnd={onSortEnd} />
        </div>
      )}
    </div>
  );
});

const SortableItem = SortableElement(({ value, index }) => (
  <div className="thumb" key={`${value.name}${index}`}>
    <img src={Trash} width="25" className="trashPanel" />
    <div className="thumbInner">
      <img src={value.preview} className="img" />
    </div>
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  console.log("items ==> ", items);
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
