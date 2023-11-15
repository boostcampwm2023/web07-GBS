import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HlsPlayer = () => {
  const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls:Hls;

    if (video) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
      } else if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, []);

  return <video ref={videoRef} controls />;
};

export default HlsPlayer;
