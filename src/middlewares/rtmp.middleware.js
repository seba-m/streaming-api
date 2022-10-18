const NodeMediaServer = require('node-media-server');

class Rtmp {
    server;
    #config = {
        logType: 3,
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 30,
            ping_timeout: 60
        },
        http: {
            port: 8000,
            allow_origin: "*",
            mediaroot: './media/streamvideo',
        },
        auth: {
            play: false,
            publish: false,
            api: true,
            api_user: 'admin',
            api_pass: 'nms2018',
        },
        trans: {
            ffmpeg: './ffmpeg.exe',
            tasks: [
                {
                    app: 'live',
                    ac: 'aac',
                    vc: 'libx264',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        }
    };

    constructor() {
        this.server = new NodeMediaServer(this.#config);
        this.server.run();
        this.#configureStream();
    }

    #validStreamUrl(url) {
        const regex = /^(\/app{1})(\/)([\da-fA-F]{128})$/
        const regexstring = new RegExp(regex, "gim")
        return regexstring.test(url);
    }

    #rejectStream(idStream) {
        let session = this.server.getSession(idStream);
        session.reject();
    }

    #configureStream() {
        /*this.server.on('preConnect', (id, args) => {
            // console.log('\n[1 NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}\n`);
            // let session = this.server.getSession(id);
            // session.reject();
        });

        this.server.on('postConnect', (id, args) => {
            // console.log('\n[2 NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}\n`);
        });

        this.server.on('doneConnect', (id, args) => {
            // console.log('\n[3 NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}\n`);
        });*/

        this.server.on('prePublish', (id, StreamPath, args) => {
            console.log('\n[4 NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}\n`);

            console.log(`path = ${StreamPath} valid path = ${this.#validStreamUrl(StreamPath)}`);

            /*if (!this.#validStreamUrl(StreamPath))
                this.#rejectStream(id);*/

        });

        this.server.on('postPublish', (id, StreamPath, args) => {
            console.log('\n[5 NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}\n`);
        });

        this.server.on('donePublish', (id, StreamPath, args) => {
            console.log('\n[6 NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}\n`);
        });

        this.server.on('prePlay', (id, StreamPath, args) => {
            console.log('\n[7 NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}\n`);
            /*let session = this.server.getSession(id);
            session.reject();*/
        });

        this.server.on('postPlay', (id, StreamPath, args) => {
            console.log('\n[8 NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}\n`);
        });

        this.server.on('donePlay', (id, StreamPath, args) => {
            console.log('\n[9 NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}\n`);
        });
    }
}

exports.Rtmp = Rtmp;