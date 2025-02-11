import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDb from './infrastructure/database/db'
import router from './infrastructure/routes/badgeRoutes'
import consume from './infrastructure/messaging/kafka/consume'
import expressJson from 'express';
import profileRouter from './infrastructure/routes/profile';
import morgan from 'morgan'
dotenv.config()

connectDb()
consume()
const app = express()

const badgeRouter = express.Router()

router(badgeRouter)

app.use(morgan('dev'))
const corsOptions = {
    origin: 'https://atomica.live', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] // Add PATCH here
};

app.use(cors(corsOptions))

app.options('*', cors(corsOptions))

app.use(expressJson.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/badge', badgeRouter)

app.use('/profile', profileRouter)

app.use((req, res, next) => {
    console.log('CORS Headers:', res.getHeaders())
    next()
})

app.get('/', (req, res)=>{
    res.json("BADGE SERVICE")
})

const PORT = process.env.PORT || 5003
app.listen(PORT, () => {
    console.log(`Badge service is running at http://localhost:${PORT}`)
})