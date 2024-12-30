import express from 'express';
import bodyParser from 'body-parser';
import badgeRouter from './routes/badgeRouter';
import cors from 'cors';
import connectDb from './config/db';

// Connect to the database
connectDb();

const app = express();
const port = 5003;

// Middleware for CORS
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};
app.use(cors(corsOptions));
app.options("*", cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define routes AFTER middleware
app.use('/badge', badgeRouter);

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
