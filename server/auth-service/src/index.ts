import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();
import { UserRoute } from './framework/api/routes/userRoute'
import { errorMiddleware } from './usecases/middlewares/errorMiddleware'

import connectDb from './framework/api/config/db'
import { AdminRoute } from './framework/api/routes/adminRoutes';

connectDb()

const app = express()

const userRouter = express.Router()
const adminRouter = express.Router()
AdminRoute(adminRouter)
UserRoute(userRouter)

app.use(cors({
    credentials: true,
    origin: 'https://atomica.live'
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res)=>{
    res.json("AUTHENTICATION SERVICE")
})

app.use(errorMiddleware)


const PORT = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`Authentication server is running at http://localhost:${PORT}`);
})