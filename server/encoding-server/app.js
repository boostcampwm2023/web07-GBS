const NodeMediaServer = require('node-media-server');

const config = {
    rtmp: {
        port: 19350,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    trans: {
        ffmpeg: '/usr/local/bin/ffmpeg',
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                hlsKeep: true, // to prevent hls file delete after end the stream
            }
        ]
    }
};

const nms = new NodeMediaServer(config)
nms.run();