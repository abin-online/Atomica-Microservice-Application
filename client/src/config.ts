const config = {
    development: {
        BASEURL: "http://localhost:4001/",
        SOCKET_URL: "ws://localhost:4001/socket.io",
    },
    production: {
        BASEURL: "https://atomica.live/",
        SOCKET_URL: "wss://atomica.live/socket.io",
    },
    test: {
        BASEURL: "http://localhost:4001/",
        SOCKET_URL: "ws://localhost:4001/socket.io",
    },
};

const environment = process.env.NODE_ENV || "development";

export default config[environment];