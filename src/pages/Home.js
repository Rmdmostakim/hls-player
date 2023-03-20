import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
export default function Home() {
  const ref = useRef();
  function updateQuality(newQuality) {
    window.hls.levels.forEach((level, index) => {
      if (level.height === newQuality) {
        window.hls.currentLevel = index;
      }
    });
  }
  useEffect(() => {
    const video = ref.current;
    const hls = new Hls();
    const src =
      "http://127.0.0.1:8000/api/watch/qcF8CFHqYJ9qhTRAaGU9NTFX8g7jafan.m3u8";
    const defaultOptions = {};
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, daya) {
        const quality = hls.levels.map((l) => l.height);
        defaultOptions.controls = [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ];
        defaultOptions.quality = {
          default: quality[0],
          options: quality,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        new Plyr(video, defaultOptions);
      });
      hls.attachMedia(video);
      window.hls = hls;
    }
  });
  return (
    <div class="container" style={{ width: "400px" }}>
      <video id="player" ref={ref} controls ratio="3:4"></video>
    </div>
  );
}
