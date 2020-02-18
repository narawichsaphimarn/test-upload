import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import VideoLibraryRoundedIcon from "@material-ui/icons/VideoLibraryRounded";
import PhotoLibraryRoundedIcon from "@material-ui/icons/PhotoLibraryRounded";
import { useStyles } from "./style";
import TabPanel from "../../action/tabPanel";
import { useDropzone } from "react-dropzone";
import RenderImage from "../render/images";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

var valueUrl = [];

const Upload = () => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const [files, setFiles] = useState([]);

  // useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach(file => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const plusFiles = e => {
    valueUrl = [...valueUrl, ...e];
  };

  const a11yProps = index => {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`
    };
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Video"
            icon={<VideoLibraryRoundedIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label="Image"
            icon={<PhotoLibraryRoundedIcon />}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        <div {...getRootProps()} className="dragZoneContainer">
          <input {...getInputProps()} accept="image/*" />
          <p className="textPanel">
            Drag 'n' drop some files here, or click to select files
          </p>
          <aside className="thumbsContainer">
            <RenderImage
              value={files}
              plusFiles={plusFiles}
              oldFile={valueUrl}
            />
          </aside>
        </div>
      </TabPanel>
    </div>
  );
};

export default Upload;
