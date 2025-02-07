import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './infrastructure/database/db'
import { CommunityRoute } from './infrastructure/routes/communityRoutes'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
dotenv.config()
connectDb()

const app = express()
const communityRouter = express.Router()
CommunityRoute(communityRouter);

const corsOptions ={
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/community', communityRouter);

app.get('/', (req, res) => {
    res.json('COMMUNITY SERVICE')
})
const PORT = process.env.PORT || 5006
app.listen(PORT, () => {
    console.log(`Community service is running at  http://localhost:${PORT}`);})