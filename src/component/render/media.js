import React, { forwardRef, useEffect, useState, Fragment } from "react";
import ListItem from "./listItemUpload";
import ListItemRender from "./listItemRender";
import { Button } from "antd";

import { data } from "../../action/mockData";

const Media = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([...list, ...data.result[0].items]);
    console.log("list ==> ", list);
  }, []);

  return (
    <Fragment>
      <ul>
        {props.files.map((item, index) => {
          return (
            <ListItem key={`file-list${index}`} item={item} index={index} />
          );
        })}
        {list.map((item, index) => {
          return <ListItemRender key={`file-list${index}`} item={item} />;
        })}
      </ul>
      <div>
        {list.length !== 0 ? (
          <Button
            style={{ width: "200px", marginLeft: "calc((100% - 200px) / 2)" }}
            size="large"
          >
            View more
          </Button>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
});

export default Media;
