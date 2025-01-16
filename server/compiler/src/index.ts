import express from 'express';
import { compilerRouter } from './routes/compilerRoutes';
import cors from 'cors';
import consume from './message/kafkaConsume';
import connectDb from './database/db';

consume()

const app = express();

connectDb()
app.use(cors())

app.use(express.json());

const router = express.Router();

compilerRouter(router)

app.use('/compiler' , router)


// app.use(cors({
//     credentials: true,
//     origin: process.env.CORS_ORIGIN
// }))


app.get('/', (req, res)=> {
    res.json('COMPILER SERVICE')
})

const PORT = process.env.PORT || 5004

app.listen(PORT, () => {
    console.log(`Compiler service is running on http://localhost:${PORT}/`)
})