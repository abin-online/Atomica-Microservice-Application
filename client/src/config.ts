const config = {
    development: {
        BASEURL: "http://localhost:4001/",
        SOCKET_URL: "ws://localhost:4001/collaboration",
    },
    production: {
        BASEURL: "https://atomica.live/",
        SOCKET_URL: "wss://atomica.live/collaboration",
    },
    test: {
        BASEURL: "http://localhost:4001/",
        SOCKET_URL: "ws://localhost:4001/collaboration",
    },
};

const environment = process.env.NODE_ENV || "development";

export default config[environment];
