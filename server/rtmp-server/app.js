require("dotenv").config();
const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  relay: {
    ffmpeg: "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "live",
        mode: "push",
        edge: "rtmp://" + process.env.ENCODING_SERVER_HOST,
      },
    ],
  },
};

const nms = new NodeMediaServer(config);
nms.run();
