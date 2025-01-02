import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import consume from './infrastructure/messaging/kafka/consume'
import connectDb from './infrastructure/database/db'
import { ProblemRoute } from './infrastructure/routes/problemRoutes'
import morgan from 'morgan'
import bodyParser from 'body-parser'

dotenv.config()

// Connect to DB
connectDb()

// Initialize Express app
const app = express()

// Define Router for problem routes
const problemRouter = express.Router()
ProblemRoute(problemRouter)

// CORS Options Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Allow the frontend app to make requests
    credentials: true, // Allow credentials (cookies, headers)
}

// CORS Middleware should be applied before routes
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))  // Allow preflight requests

// Middleware for logging HTTP requests
app.use(morgan('dev'))

// Middleware to parse JSON bodies (before routes)
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Add the problem routes
app.use('/problem', problemRouter)

// Debugging CORS headers
app.use((req, res, next) => {
    console.log('CORS Headers:', res.getHeaders())
    next()
})

// Kafka consumer (assuming you need this for consuming messages)
consume()

// Set up the port and start the server
const PORT = process.env.PORT || 5002
app.listen(PORT, () => {
    console.log(`Problem service is running at http://localhost:${PORT}`)
})
