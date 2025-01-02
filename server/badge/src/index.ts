import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDb from './infrastructure/database/db'
import router from './infrastructure/routes/badgeRoutes'
import consume from './infrastructure/messaging/kafka/consume'
import expressJson from 'express';

dotenv.config()

connectDb()
consume()
const app = express()

const badgeRouter = express.Router()

router(badgeRouter)

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] // Add 'PATCH' here
};

app.use(cors(corsOptions))

app.options('*', cors(corsOptions))

app.use(expressJson.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/badge', badgeRouter)

app.use((req, res, next) => {
    console.log('CORS Headers:', res.getHeaders())
    next()
})

const PORT = process.env.PORT || 5003
app.listen(PORT, () => {
    console.log(`Badge service is running at http://localhost:${PORT}`)
})