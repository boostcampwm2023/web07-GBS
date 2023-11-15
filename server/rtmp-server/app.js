require("dotenv").config();
const NodeMediaServer = require("node-media-server");
let exec = require('child_process').exec

exec('node system_func.js', (err,out,stderr) => {
  console.log(out)
});

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 80,
    mediaroot: __dirname + "/media",
    webroot: __dirname + "/www",
    allow_origin: "*",
    api: true,
  },
    trans: {
      ffmpeg: "/usr/local/bin/ffmpeg",
      tasks: [
        {
          app: "live",
          vc: "copy",
          vcParam: [],
          ac: "aac",
          acParam: ["-ab", "64k", "-ac", "1", "-ar", "44100"],
          hls: true,
          hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        },
      ],
    },

};

const nms = new NodeMediaServer(config);
nms.run();
