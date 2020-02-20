/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";

const VideoPlay = props => {
  // eslint-disable-next-line no-unused-vars
  console.log("props ==> ", props);
  let playerState = useRef();

  useEffect(() => {
    videojs(playerState.current, {
      controls: true,
      autoplay: false
    });
  }, []);
  return (
    <div>
      <div data-vjs-player>
        <video
          ref={playerState}
          className="video-js vjs-default-skin vjs-16-9"
          playsInline
        >
          <source src={props.urlVideo} type={props.type} />
        </video>
      </div>
    </div>
  );
};

export default VideoPlay;
