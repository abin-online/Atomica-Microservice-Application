import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const {
    PORT,
    AUTH_SERVICE,
    TEST_SERVICE,
    PROBLEM_SERVICE,
    BADGE_SERVICE,
    COMPILER_SERVICE,
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
    route: '/problem'
}
]

const BOOLEAN = 1+2 == Number(SECURITY_NUMBER)

app.use((req, res, next) => {
    console.log(`LOGGING 📝 : ${req.method} request to: ${req.originalUrl}`);
    next(); 
});

services.forEach((service) => {
    app.use(service?.route, createProxyMiddleware({
        target: service?.path,
        changeOrigin: BOOLEAN
    }))
})

app.get('/', (req, res)=>{
    res.json(COMMAND)
})

app.listen(PORT, () => {
    console.log(`ATOMICA RUNNING ON http://locahost:${PORT} 🍃`);
})
