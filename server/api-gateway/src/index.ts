import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"

const app = express()

const services = {
    auth: 'http://localhost:5000',
    test: 'http://localhost:5001',
    problem: 'http://localhost:5002',
    badge: 'http://localhost:5003'
}

app.use('/auth', createProxyMiddleware({
    target: services.auth,
    changeOrigin: true
}))

app.use('/mcq', createProxyMiddleware({
    target: services.test,
    changeOrigin: true
}))
app.use('/badge', createProxyMiddleware({
    target: services.badge,
    changeOrigin: true
}))

app.use('/problem', createProxyMiddleware({
    target: services.problem,
    changeOrigin: true
}))

const PORT = 4001

app.listen(PORT, ()=> {
    console.log(`ATOMICA IS RUNNNING ON http://locahost:${PORT}`);
})