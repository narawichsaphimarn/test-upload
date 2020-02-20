import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhotoLibraryRoundedIcon from "@material-ui/icons/PhotoLibraryRounded";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import { useStyles } from "./style";
import TabPanel from "../../action/tabPanel";
import { useDropzone } from "react-dropzone";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "antd";
import Media from "../render/media";
import "../../App.css";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

var valueUrl = [];
var valueVideoUrl = [];

const Upload = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState([]);
  const [click, setClick] = useState(false);
  const [input, setInput] = useState("");

  const { getInputProps, open } = useDropzone({
    accept: "video/*",
    onDrop: acceptedFiles => {
      setValue(1);
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
    setClick(false);
  };
  const plusFilesVideo = e => {
    valueVideoUrl = [...valueVideoUrl, ...e];
    setClick(false);
  };

  const a11yProps = index => {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`
    };
  };

  console.log("files ==> ", files);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
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
              label="Upload"
              icon={<PublishRoundedIcon />}
              {...a11yProps(0)}
            />
            <Tab
              label="Media"
              icon={<PhotoLibraryRoundedIcon />}
              {...a11yProps(1)}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="dragZoneContainer">
          <input {...getInputProps()} />
          <Button
            type="primary"
            ghost
            shape="round"
            icon="download"
            size="large"
            onClick={open}
          >
            Upload file
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="mediaContainer">
          <Media
            files={files}
            stateTab={value => {
              setValue(value);
            }}
          />
        </div>
      </TabPanel>
    </div>
  );
};

export default Upload;
