import React, { forwardRef, useEffect, useState, Fragment } from "react";
import ListItem from "./listItem";

const Media = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <Fragment>
      <ul>
        {list.map((item, index) => {
          return <ListItem key={`file-list${index}`} item={item} />;
        })}
      </ul>
      <ul>
        {props.files.map((item, index) => {
          return (
            <ListItem key={`file-list${index}`} item={item} index={index} />
          );
        })}
      </ul>
    </Fragment>
  );
});

export default Media;
