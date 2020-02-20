import React, { forwardRef, useEffect, useState, Fragment } from "react";
import ListItem from "./listItem";
import { uploadFiles } from "../../action/fetch";

const Media = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    uploadFiles(props.files);
  }, [props.files]);

  return (
    <Fragment>
      <ul>
        {list.map((item, index) => {
          return <ListItem key={`file-list${index}`} item={item} />;
        })}
      </ul>
      <ul>
        {props.files.map((item, index) => {
          return <ListItem key={`file-list${index}`} item={item} />;
        })}
      </ul>
    </Fragment>
  );
});

export default Media;
