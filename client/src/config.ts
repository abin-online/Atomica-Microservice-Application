const config = {
    development: {
        BASEURL: "http://localhost:4001/",
    },
    production: {
        BASEURL: "https:Atomica.com/",
    },
    test: {
        BASEURL: "http://localhost:5000/",
    },
};

const environment = process.env.NODE_ENV || "development";

export default config[environment];
