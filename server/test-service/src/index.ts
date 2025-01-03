import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();
import { QuestionRoute } from './infrastructure/routes/questionRoutes';
//import { errorMiddleware } from './usecases/middlewares/errorMiddleware'
import { TagRoute } from './infrastructure/routes/tagRoutes';

import connectDb from './infrastructure/database/db';
connectDb()


const app = express()


const questionRouter = express.Router()
const tagRouter = express.Router()
TagRoute(tagRouter)
QuestionRoute(questionRouter)

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/mcq', questionRouter)
app.use('/tag', tagRouter)


const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Test server is running at http://localhost:${PORT}`);
})

//http://localhost:5001/tag/addTag