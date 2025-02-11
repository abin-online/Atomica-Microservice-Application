import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();
import { QuestionRoute } from './infrastructure/routes/questionRoutes';
//import { errorMiddleware } from './usecases/middlewares/errorMiddleware'
import { TagRoute } from './infrastructure/routes/tagRoutes';
import morgan from 'morgan'
import connectDb from './infrastructure/database/db';
connectDb()


const app = express()


const questionRouter = express.Router()
const tagRouter = express.Router()
TagRoute(tagRouter)
QuestionRoute(questionRouter)

const corsOptions = {
    origin: 'https://atomica.live', // Allow the frontend app to make requests
    credentials: true, // Allow credentials (cookies, headers)
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))  


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/mcq', questionRouter)
app.use('/tag', tagRouter)

app.get('/', (req, res)=>{
    res.json("TEST SERVICE")
})

app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log(`LOGGING 📝 : ${req.method} request to: ${req.originalUrl}`);
    next();
});
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Test server is running at http://localhost:${PORT}`);
})

//http://localhost:5001/tag/addTag