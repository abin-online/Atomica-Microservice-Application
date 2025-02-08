import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'

const app = express()

const {
    PORT,
    AUTH_SERVICE,
    TEST_SERVICE,
    PROBLEM_SERVICE,
    BADGE_SERVICE,
    COMPILER_SERVICE,
    COLLABORATION_SERVICE,
    COMMUNITY_SERVICE,
    CONTEST_SERVICE,
    SECURITY_NUMBER,
    COMMAND
} = process.env

const services = [{
    path: AUTH_SERVICE,
    route: '/auth'
}, {
    path: TEST_SERVICE,
    route: '/test'
}, {
    path: PROBLEM_SERVICE,
    route: '/problem'
}, {
    path: BADGE_SERVICE,
    route: '/badge'
}, {
    path: COMPILER_SERVICE,
    route: '/compiler'
}, {
    path: COLLABORATION_SERVICE,
    route: '/collaboration'
},
{
    path: COMMUNITY_SERVICE,
    route: '/api/community'
}, {
    path: CONTEST_SERVICE,
    route: '/contest'
}
]

//LOGGING 
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log(`LOGGING 📝 : ${req.method} request to: ${req.originalUrl}`);
    next();
});

const BOOLEAN = 1 + 2 == Number(SECURITY_NUMBER)

services.forEach((service) => {
    const isCollaboration = service.route === '/collaboration'
    console.log(service.path)
    app.use(service?.route, createProxyMiddleware({
        target: service?.path,
        changeOrigin: BOOLEAN,
        ws: isCollaboration
    }))
})

app.use(
    "/",
    createProxyMiddleware({
        target: "http://frontend-srv:3000",
        changeOrigin: true,
    })
);

app.get('/', (req, res) => {
    res.json(COMMAND)
})


app.get('/services', (req, res) => {
    res.json(
        services
    )
})

app.listen(PORT, () => {
    console.log(`ATOMICA RUNNING ON http://locahost:${PORT} 🍃`);
})
