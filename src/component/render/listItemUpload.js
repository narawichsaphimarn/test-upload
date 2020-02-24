import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import {
  videoUploadFlow,
  uploadToCipher,
  checkStatus,
  imageUploadFlow
} from "../../action/fetch";
import { Spin, Alert } from "antd";

const data = {
  id: "",
  type: "",
  type_file: "",
  bucket: "",
  key_bucket: "",
  video_id: "",
  status: "prepending",
  is_delete: false,
  duration: 0,
  path: "",
  storage: ""
};

const signal = axios.CancelToken.source();

const ListItem = props => {
  const [mediaFile, setMediaFile] = useState({});
  const [pendingPayload, setPendingPayload] = useState([]);
  const [status, setStatus] = useState("prepending");
  const [percentCompleted, setPercentCompleted] = useState(0);
  let checkStatusQueue = createRef();

  if (status !== "ready" || status !== "prepending") {
    window.onbeforeunload = function() {
      return "Data will be lost if you leave the page, are you sure?";
    };
  }

  useEffect(() => {
    return () => {
      signal.cancel("Api is being canceled");
    };
  }, []);

  useEffect(() => {
    if (typeof props.item.status === "undefined") {
      if (
        typeof mediaFile.status === "undefined" ||
        mediaFile.status === "prepending"
      ) {
        setMediaFile({ ...data, type: props.item.type });
      } else {
        setMediaFile({ ...mediaFile });
      }
    } else {
      setMediaFile(props.item);
    }
  }, [props.item]);

  useEffect(() => {
    if (typeof mediaFile.status !== "undefined") {
      if (mediaFile.type.split("/")[0] === "video") {
        switch (status) {
          case "prepending":
            videoUploadFlow(props.item, signal, res => {
              if (res.code === 200) {
                setPendingPayload(res.result[0].clientPayload);
                setStatus(res.result[1][0].status);
                setMediaFile({
                  ...mediaFile,
                  id: res.result[1][0].id,
                  video_id: res.result[0].videoId,
                  status: res.result[1][0].status
                });
              }
            });
            break;

          case "pending":
            uploadToCipher(
              pendingPayload,
              props.item,
              signal,
              progressEvent => {
                setPercentCompleted(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                );
              },
              res => {
                if (res.status === 201) {
                  setStatus("Queued");
                  setMediaFile({
                    ...mediaFile,
                    status: "Queued"
                  });
                }
              }
            );
            break;

          case "Queued":
            checkProcessStatus(mediaFile.id);
            break;

          case "Processing":
            checkProcessStatus(mediaFile.id);
            break;

          case "ready":
            clearInterval(checkStatusQueue);
            break;

          default:
            break;
        }
      } else {
        imageUploadFlow(
          props.item,
          progressEvent => {
            setPercentCompleted(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
          signal,
          res => {
            if (res.code === 200) {
              console.log("mediaFile :: ", mediaFile);
              console.log("res ==> ", res);
            }
          }
        );
      }
    }
  }, [mediaFile.status]);

  const checkProcessStatus = id => {
    clearInterval(checkStatusQueue);
    checkStatusQueue = setInterval(() => {
      checkStatus(id, signal, res => {
        if (res.status === 200) {
          const { result } = res.data;
          setStatus(result[0].status);
          setMediaFile({
            ...mediaFile,
            status: result[0].status
          });
        }
      });
    }, 10 * 1000);
  };

  return (
    <li className="listPanel">
      <div className="imgPanel">
        <img src="https://img.icons8.com/cotton/150/000000/stack-of-photos.png" />
      </div>
      {typeof mediaFile.status !== "undefined" ? (
        <div>
          {mediaFile.type.split("/")[0] === "video" ? (
            <div>
              {status === "prepending" ? (
                <Spin
                  size="large"
                  className="spin"
                  tip="Check status..."
                ></Spin>
              ) : (
                ""
              )}
              {status === "pending" ? (
                <div className="load">
                  <progress
                    id="file"
                    value={percentCompleted}
                    max="100"
                    style={{ height: "100%" }}
                  ></progress>
                </div>
              ) : (
                ""
              )}
              {status === "Queued" ? (
                <Spin size="large" className="spin" tip="Queued..."></Spin>
              ) : (
                ""
              )}
              {status === "Processing" ? (
                <Spin size="large" className="spin" tip="Processing..."></Spin>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default ListItem;
