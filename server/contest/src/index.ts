import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import morgan from 'morgan'
import connectDb from './infrastructure/database/db'
import { ContestRoute } from './infrastructure/routes/contestRoutes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
connectDb()

const app = express()
const contestRouter = express.Router()
ContestRoute(contestRouter);

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(morgan('dev'))

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/contest', contestRouter);

app.get('/', (req, res) => {
    res.json('CONTEST SERVICE')
})

const PORT = process.env.PORT || 5007
app.listen(PORT, () => {
    console.log(`Contest service is running at http://localhost:${PORT}`)
})