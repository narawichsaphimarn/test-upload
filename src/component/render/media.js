import React, { forwardRef, useEffect, useState, Fragment } from "react";
import ListItem from "./listItemUpload";
import ListItemRender from "./listItemRender";

import { data } from "../../action/mockData";

const Media = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("data ==> ", data);
    setList(data.result[0].items);
  }, []);

  return (
    <Fragment>
      <ul>
        {props.files.map((item, index) => {
          return (
            <ListItem key={`file-list${index}`} item={item} index={index} />
          );
        })}
      </ul>
      <ul>
        {list.map((item, index) => {
          return <ListItemRender key={`file-list${index}`} item={item} />;
        })}
      </ul>
    </Fragment>
  );
});

export default Media;
